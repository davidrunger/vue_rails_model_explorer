# frozen_string_literal: true

require 'runger_rails_model_explorer'

RSpec.configure do |config|
  config.disable_monkey_patching!

  config.expect_with(:rspec) do |c|
    c.syntax = :expect
  end
end
