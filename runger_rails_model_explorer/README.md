![Vue Rails Model Explorer](https://github.com/user-attachments/assets/ef0d2303-a70a-4e1c-8a96-5c40a7a1a484)

# RungerRailsModelExplorer

Explore your Rails models.

## Installation

Add to your `Gemfile`:

```ruby
gem 'runger_rails_model_explorer'
```

and then run `bundle install`.

## Usage

Add a Rails controller to your application that looks something like this:

```rb
# app/controllers/model_graph_controller.rb
class ModelGraphController < ApplicationController
  def index
    bootstrap(model_metadata: RungerRailsModelExplorer.model_metadata)
  end
end
```

Add a view that looks something like this:

```haml
-# app/views/model_graph/index.html.haml
- content_for(:page_assets) do
  = ts_tag('model_graph')
```

Add a route that looks something like this:

```rb
# config/routes.rb
get 'models', to: 'model_graph#index'
```

**NOTE:** If this is a private app, then you will probably want to secure that route somehow, e.g. within a Devise `authenticate :admin_user do ... end` block.

Then, follow setup instructions for [the `@davidrunger/vue-model-explorer` NPM package][npm-package-setup-instructions].

[npm-package-setup-instructions]: https://github.com/davidrunger/vue_rails_model_explorer/blob/main/vue-model-explorer/README.md
