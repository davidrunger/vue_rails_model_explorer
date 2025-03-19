# frozen_string_literal: true

require_relative 'lib/runger_rails_model_explorer/version'

Gem::Specification.new do |spec|
  spec.name = 'runger_rails_model_explorer'
  spec.version = RungerRailsModelExplorer::VERSION
  spec.authors = ['David Runger']
  spec.email = ['davidjrunger@gmail.com']

  spec.summary = 'Explore your Rails models'
  spec.homepage = 'https://github.com/davidrunger/vue_rails_model_explorer/blob/main/runger_rails_model_explorer/README.md'
  spec.license = 'MIT'
  spec.required_ruby_version = '>= 3.4.2'

  spec.metadata['homepage_uri'] = spec.homepage
  spec.metadata['source_code_uri'] = spec.homepage
  spec.metadata['changelog_uri'] = 'https://github.com/davidrunger/vue_rails_model_explorer/blob/main/runger_rails_model_explorer/CHANGELOG.md'
  spec.metadata['rubygems_mfa_required'] = 'true'

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files =
    IO.popen(%w[git ls-files -z], chdir: __dir__, err: IO::NULL) do |ls|
      ls.each_line("\x0", chomp: true).select do |f|
        f.start_with?('lib/')
      end
    end + %w[
      LICENSE.txt
      README.md
    ]
  spec.require_paths = ['lib']

  # Uncomment to register a new dependency of your gem
  spec.add_dependency('activerecord', '>= 8.0.2')
end
