# Vue Model Explorer

Render info about your Rails models in a keyboard-navigable linked graph.

## Installation

```sh
pnpm add @davidrunger/vue-model-explorer
```

## Usage

First, make sure that you have already followed the [setup instructions for the `runger_rails_model_explorer` gem][gem-setup-instructions].

[gem-setup-instructions]: https://github.com/davidrunger/vue_rails_model_explorer/blob/main/runger_rails_model_explorer/README.md

Then, create an entrypoint something like this:

```ts
// app/javascript/entrypoints/model_graph.ts
import { ModelGraph } from '@davidrunger/vue-model-explorer';
import { renderApp } from '@/lib/customized_vue';

renderApp(ModelGraph);
```

So that Tailwind will include CSS for the Tailwind classes used by the `ModelGraph` component, add something like this to the CSS file where you `@import 'tailwindcss'`:

```css
/* app/assets/stylesheets/styles.css */
@source '../../../node_modules/@davidrunger/vue-model-explorer/src';
```

Now, launch a Vite development server and a Rails server.

Go to http://localhost:3000/models and have fun exploring your database models!
