# frozen_string_literal: true

require_relative 'runger_rails_model_explorer/version'

module RungerRailsModelExplorer
  class << self
    def model_metadata
      Rails.application.eager_load!

      models =
        ActiveRecord::Base.descendants.select do |model_class|
          !model_class.abstract_class? && model_class.table_exists?
        end

      models.map do |model|
        {
          model_name: model.name,
          table_name: model.table_name,
          columns: model.columns.map do |column|
            {
              name: column.name,
              type: column.type,
              null: column.null,
              default: column.default,
            }
          end,
          associations: model.reflect_on_all_associations.map do |association|
            {
              name: association.name,
              macro: association.macro,
              class_name: association.class_name,
              options: association.options,
            }
          end,
        }
      end
    end
  end
end
