<template lang="pug">
.flex.h-dvh
  // Left side: the graph visualization.
  #graph-container.flex-1.h-dvh.border

  // Right side: the details side panel.
  aside.flex.flex-col.w-100.border-l.p-2.text-lg
    // Model name.
    h2.text-3xl.font-mono.italic.mb-0.pl-6 {{ focusedNodeData.modelName }}

    // Columns section.
    ol.list-decimal.pl-6
      li(
        v-for="column in focusedNodeData.columns"
        :key="column.name"
        :title="`Null: ${column.null}\nDefault: ${column.default}`"
      )
        b.font-mono {{ column.name }}
        |
        |
        span.text-neutral-400 ({{ column.type }})

    // Associations section.
    h3.text-center.mt-4 Associations
    template(v-if="focusedNodeData.associations.length")
      ul.associations.list-none.pl-0.overflow-y-scroll
        li.text-sm.mb-2(
          v-for="(association, index) in focusedNodeData.associations"
          :key="association.name"
          :class="index === currentAssociationIndex && 'selected'"
        )
          button.text-left.w-full(
            @click="selectAssociation(association, index)"
            class="hover:underline focus:outline-none"
            :title="`Options: ${JSON.stringify(association.options, null, 2)}`"
          )
            span.font-mono {{ association.name }} #[span ({{ association.macro }} #[span.font-mono {{ association.class_name }}])]
    template(v-else)
      p No associations.
</template>

<!-- `cytoscape-dagre` doesn't have up-to-date-types available, so we can't use TypeScript -->
<!-- eslint-disable-next-line vue/block-lang -->
<script setup lang="js">
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { sortBy } from 'lodash-es';
import { computed, onMounted, onUnmounted, ref } from 'vue';

cytoscape.use(dagre);

let cyInstance;

const initialData = window.davidrunger.bootstrap.model_metadata;
if (!initialData) throw 'Missing data!';

const focusedNode = ref(null);

const focusedNodeData = computed(() => {
  if (!focusedNode.value) {
    return {
      modelName: '',
      columns: [],
      associations: [],
    };
  } else {
    const node = focusedNode.value;

    return {
      modelName: node.data('label'),
      columns: node.data('columns') || [],
      associations: node.data('associations') || [],
    };
  }
});

// Track which association is currently selected (for keyboard navigation and styling).
const currentAssociationIndex = ref(0);

// Build graph elements from the metadata.
function buildGraphData(modelMetadata) {
  const elements = [];
  const modelNodes = {};

  // Create nodes for each model.
  modelMetadata.forEach((model) => {
    const nodeId = model.model_name;
    modelNodes[nodeId] = true;
    elements.push({
      data: {
        id: nodeId,
        label: model.model_name,
        tableName: model.table_name,
        columns: sortBy(model.columns, 'name'),
        associations: sortBy(model.associations, 'name'),
      },
    });
  });

  // Create edges for associations, only if target model exists.
  modelMetadata.forEach((model) => {
    model.associations.forEach((association) => {
      const source = model.model_name;
      const target = association.class_name;
      if (modelNodes[target]) {
        elements.push({
          data: {
            id: `${source}_${association.name}`,
            source,
            target,
            association: association.name,
            macro: association.macro,
          },
        });
      }
    });
  });

  return elements;
}

onMounted(() => {
  const elements = buildGraphData(initialData);
  cyInstance = cytoscape({
    container: document.getElementById('graph-container'),
    elements,
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          'text-valign': 'center',
          color: '#fff',
          'background-color': '#0074D9',
          width: '60',
          height: '60',
          'font-size': '10px',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 2,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
        },
      },
      {
        selector: '.focused',
        style: {
          'background-color': '#FF4136',
        },
      },
      {
        selector: '.highlighted-edge',
        style: {
          'line-color': '#FF4136',
          'target-arrow-color': '#FF4136',
          width: 4,
        },
      },
    ],
  });

  const maxNodeWidth = Math.max(
    ...cyInstance.nodes().map((node) => node.width()),
  );

  const dagreLayout = cyInstance.layout({
    name: 'dagre',
    rankDir: 'TB',
    nodeSep: maxNodeWidth - 40, // Ensures separation accounts for node size.
    rankSep: maxNodeWidth + 30,
    edgeSep: 10,
  });

  cyInstance.nodes().forEach((node) => {
    const labelLength = node.data('label').length;
    node.style({
      width: Math.max(node.height(), 30 + labelLength * 4),
    });
  });

  dagreLayout.run();

  // Initially select the `User` node.
  focusNode(cyInstance.nodes().find((node) => node.id() === 'User'));

  // When a node is clicked, focus it.
  cyInstance.on('tap', 'node', function (evt) {
    focusNode(evt.target);
  });

  // Set up keyboard navigation.
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Focus a node: mark it, center the view, and update the side panel.
function focusNode(node) {
  if (focusedNode.value) {
    focusedNode.value.removeClass('focused');
  }

  focusedNode.value = node;
  node.addClass('focused');

  // Animate centering and zooming together.
  cyInstance.animate(
    {
      center: { eles: node },
      zoom: 1.3,
    },
    { duration: 300 },
  );

  // Reset association selection.
  currentAssociationIndex.value = 0;
  highlightCurrentAssociation();
}

// Highlight the edge corresponding to the current association.
function highlightCurrentAssociation() {
  cyInstance.edges().removeClass('highlighted-edge');
  if (!focusedNode.value) return;

  const data = focusedNode.value.data();
  const associations = data.associations || [];
  if (associations.length === 0) return;

  const currentAssoc =
    associations[currentAssociationIndex.value % associations.length];
  const edge = cyInstance.edges().filter((edge) => {
    return (
      edge.data('source') === data.id &&
      edge.data('association') === currentAssoc.name
    );
  });
  if (edge.length) {
    edge.addClass('highlighted-edge');
  }

  setTimeout(() => {
    document.querySelector('ul.associations li.selected')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  });
}

// Handle keyboard navigation: up/down to cycle associations and space or enter to follow one.
function handleKeydown(event) {
  if (!focusedNode.value) return;

  const focusedNodeData = focusedNode.value.data();
  const associations = focusedNodeData.associations || [];

  if (event.key === 'ArrowUp') {
    if (associations.length > 0) {
      currentAssociationIndex.value =
        (currentAssociationIndex.value - 1 + associations.length) %
        associations.length;
      highlightCurrentAssociation();
    }
    event.preventDefault();
  } else if (event.key === 'ArrowDown') {
    if (associations.length > 0) {
      currentAssociationIndex.value =
        (currentAssociationIndex.value + 1) % associations.length;
      highlightCurrentAssociation();
    }
    event.preventDefault();
  } else if (event.key === ' ' || event.key === 'Enter') {
    // Follow the highlighted association.
    if (associations.length > 0) {
      const currentAssociation =
        associations[currentAssociationIndex.value % associations.length];
      findAssociationEdgeAndFocusTarget(focusedNodeData, currentAssociation);
    }
    event.preventDefault();
  }
}

function findAssociationEdgeAndFocusTarget(focusedNodeData, associationData) {
  const edge = cyInstance
    .edges()
    .filter((edge) => {
      return (
        edge.data('source') === focusedNodeData.id &&
        edge.data('association') === associationData.name
      );
    })
    .first();
  if (edge) {
    const targetNode = edge.target();
    focusNode(targetNode);
  }
}

// Called when an association button is clicked.
function selectAssociation(association, index) {
  // Update the current association index and highlight.
  currentAssociationIndex.value = index;
  highlightCurrentAssociation();

  // Find the edge for this association from the focused node.
  findAssociationEdgeAndFocusTarget(focusedNode.value.data(), association);
}
</script>

<style scoped lang="scss">
#graph-container {
  background: #f7f7f7;
}

ul.associations {
  li {
    border-color: rgba(0, 0, 0, 0);
    border-left-width: 4px;
    color: var(--color-blue-700);
    padding: 5px;

    &.selected {
      color: var(--color-red-600);
      border-color: red;
    }
  }
}
</style>
