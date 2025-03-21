<template lang="pug">
.flex.h-dvh
  // Left side: pinned models sidebar
  aside.pinned-models-sidebar.flex.flex-col.border-r.w-100
    h3.text-xl.text-center.py-2.border-b Pinned Models
    .overflow-y-auto.flex-1
      .p-2.border-b(v-for="model in pinnedModels" :key="model.id")
        .flex.justify-between.items-center.mb-1
          h4.font-mono.italic.text-lg {{ model.modelName }}
          button.text-gray-500(
            @click="unpinModel(model.id)"
            title="Unpin model"
            class="hover:text-red-500"
          )
            span ✕
        ol.list-decimal.pl-6.text-sm
          li(
            v-for="column in model.columns"
            :key="column.name"
            :title="`Null: ${column.null}\nDefault: ${column.default}`"
          )
            b.font-mono {{ column.name }}
            |
            |
            span.text-neutral-400 ({{ column.type }})

  // Center: the graph visualization and footer container.
  .flex.flex-col.h-dvh.flex-1
    #graph-container.flex-1.h-dvh
    footer.text-gray-800.bg-gray-100.p-2.text-center.text-sm.border-t.border-neutral-400
      p Press #[b Ctrl + K] (or #[b Cmd + K] on macOS) to open the quick selector.
      p Press #[b p] to pin/unpin a model.

  // Right side: the details side panel.
  aside.flex.flex-col.w-100.border-l.p-2.text-lg
    // Model name with pin toggle.
    .flex.items-center.mb-2.pl-6
      h2.text-3xl.font-mono.italic.mb-0 {{ focusedNodeData.modelName }}
      button.ml-2(
        @click="toggleFocusedModelPinnedState"
        :title="isPinned(focusedNodeData.id) ? 'Unpin model' : 'Pin model'"
      )
        span {{ isPinned(focusedNodeData.id) ? '📌' : '📍' }}

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

  // Typeahead overlay (only shown when open).
  template(v-if="typeaheadOpen")
    .typeahead-overlay(type="dialog")
      .typeahead-container
        input.typeahead-input(
          ref="typeaheadInput"
          v-model="typeaheadQuery"
          @keydown="handleTypeaheadKeydown"
          placeholder="Type to search models..."
        )
        ul.typeahead-results
          li(
            v-for="(result, index) in searchResults"
            :key="result.item.model_name"
            :class="{ highlighted: index === typeaheadIndex }"
            @click="selectModel(result.item)"
          ) {{ result.item.model_name }}
</template>

<!-- `cytoscape-dagre` doesn't have up-to-date-types available, so we can't use TypeScript -->
<!-- eslint-disable-next-line vue/block-lang -->
<script setup lang="js">
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import Fuse from 'fuse.js';
import { sortBy } from 'lodash-es';
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import { useEventListener } from '@vueuse/core';

cytoscape.use(dagre);

let cyInstance;

const initialData = window.davidrunger.bootstrap.model_metadata;
if (!initialData) throw 'Missing data!';

const focusedNode = ref(null);

// Add a new ref for pinned models
const pinnedModels = ref([]);

const focusedNodeData = computed(() => {
  if (!focusedNode.value) {
    return {
      id: '',
      modelName: '',
      columns: [],
      associations: [],
    };
  } else {
    const node = focusedNode.value;

    return {
      id: node.id(),
      modelName: node.data('label'),
      columns: node.data('columns') || [],
      associations: node.data('associations') || [],
    };
  }
});

function isPinned(nodeId) {
  return pinnedModels.value.some((model) => model.id === nodeId);
}

function toggleFocusedModelPinnedState() {
  const nodeData = focusedNodeData.value;

  if (isPinned(nodeData.id)) {
    unpinModel(nodeData.id);
  } else {
    pinnedModels.value.push({
      id: nodeData.id,
      modelName: nodeData.modelName,
      columns: nodeData.columns,
    });
  }
}

function unpinModel(nodeId) {
  pinnedModels.value = pinnedModels.value.filter(
    (model) => model.id !== nodeId,
  );
}

// Track which association is currently selected (for keyboard navigation and styling).
const currentAssociationIndex = ref(0);

const typeaheadOpen = ref(false);
const typeaheadQuery = ref('');
const typeaheadIndex = ref(0);
const typeaheadInput = ref(null);
let fuse = null;

// Build the fuse index from initialData.
function initializeFuse() {
  fuse = new Fuse(initialData, {
    keys: ['model_name'],
    threshold: 0.4,
  });
}

// Reset the typeahead index when the query changes.
watch(typeaheadQuery, () => {
  typeaheadIndex.value = 0;
});

// Compute search results from typeaheadQuery.
const searchResults = computed(() => {
  if (!typeaheadQuery.value || !fuse) {
    return [];
  }
  return fuse.search(typeaheadQuery.value);
});

// Open and focus the typeahead overlay.
function openTypeahead() {
  typeaheadOpen.value = true;
  typeaheadQuery.value = '';
  typeaheadIndex.value = 0;
  nextTick(() => {
    typeaheadInput.value?.focus();
  });
}

// Close the typeahead overlay.
function closeTypeahead() {
  typeaheadOpen.value = false;
}

// Handle key events while typeahead is open.
function handleTypeaheadKeydown(event) {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    event.stopPropagation();
    if (searchResults.value.length > 0) {
      typeaheadIndex.value =
        (typeaheadIndex.value + 1) % searchResults.value.length;
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    event.stopPropagation();
    if (searchResults.value.length > 0) {
      typeaheadIndex.value =
        (typeaheadIndex.value - 1 + searchResults.value.length) %
        searchResults.value.length;
    }
  } else if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation(); // Prevent global keydown from firing after selection.
    if (searchResults.value.length > 0) {
      const selectedItem = searchResults.value[typeaheadIndex.value].item;
      selectModel(selectedItem);
    }
  } else if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeTypeahead();
  }
}

// Select a model from the typeahead.
function selectModel(model) {
  const node = cyInstance
    .nodes()
    .find((node) => node.id() === model.model_name);
  if (node) {
    focusNode(node);
  }
  closeTypeahead();
}

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
  initializeFuse();

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

  // Set up global key events.
  useEventListener('keydown', (event) => {
    // If typeahead is open, do not process global keys for graph navigation.
    if (typeaheadOpen.value) return;

    // Open typeahead when Ctrl+k or Cmd+k is pressed.
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openTypeahead();
      return;
    }
    if (!focusedNode.value) return;

    const nodeData = focusedNode.value.data();
    const associations = nodeData.associations || [];

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
        findAssociationEdgeAndFocusTarget(nodeData, currentAssociation);
      }
      event.preventDefault();
    } else if (event.key === 'p') {
      toggleFocusedModelPinnedState();
      event.preventDefault();
    }
  });
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

  nextTick(() => {
    document.querySelector('ul.associations li.selected')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  });
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

.typeahead-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.typeahead-container {
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.typeahead-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.typeahead-results {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.typeahead-results li {
  padding: 0.5rem;
  cursor: pointer;
}

.typeahead-results li.highlighted {
  background-color: #0074d9;
  color: #fff;
}
</style>
