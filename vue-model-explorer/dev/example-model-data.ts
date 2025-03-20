const davidrunger = {
  bootstrap: {
    model_metadata: [
      {
        model_name: 'ActiveAdmin::Comment',
        table_name: 'active_admin_comments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'namespace',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'body',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'resource_type',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'resource_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'author_type',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'author_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'resource',
            macro: 'belongs_to',
            class_name: 'Resource',
            options: {
              polymorphic: true,
              optional: true,
            },
          },
          {
            name: 'author',
            macro: 'belongs_to',
            class_name: 'Author',
            options: {
              polymorphic: true,
            },
          },
        ],
      },
      {
        model_name: 'PaperTrail::Version',
        table_name: 'versions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'item_type',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'item_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'event',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'whodunnit',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'object',
            type: 'jsonb',
            null: true,
            default: null,
          },
          {
            name: 'object_changes',
            type: 'jsonb',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'item',
            macro: 'belongs_to',
            class_name: 'Item',
            options: {
              polymorphic: true,
              optional: true,
              inverse_of: false,
            },
          },
        ],
      },
      {
        model_name: 'ActiveStorage::VariantRecord',
        table_name: 'active_storage_variant_records',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'blob_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'variation_digest',
            type: 'string',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'blob',
            macro: 'belongs_to',
            class_name: 'Blob',
            options: {},
          },
          {
            name: 'image_attachment',
            macro: 'has_one',
            class_name: 'ActiveStorage::Attachment',
            options: {
              class_name: 'ActiveStorage::Attachment',
              as: 'record',
              inverse_of: 'record',
              dependent: 'destroy',
              strict_loading: false,
            },
          },
          {
            name: 'image_blob',
            macro: 'has_one',
            class_name: 'ActiveStorage::Blob',
            options: {
              through: 'image_attachment',
              class_name: 'ActiveStorage::Blob',
              source: 'blob',
              strict_loading: false,
            },
          },
        ],
      },
      {
        model_name: 'ActiveStorage::Attachment',
        table_name: 'active_storage_attachments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'record_type',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'record_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'blob_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'record',
            macro: 'belongs_to',
            class_name: 'Record',
            options: {
              polymorphic: true,
              touch: true,
            },
          },
          {
            name: 'blob',
            macro: 'belongs_to',
            class_name: 'ActiveStorage::Blob',
            options: {
              class_name: 'ActiveStorage::Blob',
              autosave: true,
              inverse_of: 'attachments',
            },
          },
        ],
      },
      {
        model_name: 'ActiveStorage::Blob',
        table_name: 'active_storage_blobs',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'key',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'filename',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'content_type',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'metadata',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'service_name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'byte_size',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'checksum',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'attachments',
            macro: 'has_many',
            class_name: 'Attachment',
            options: {
              autosave: false,
            },
          },
          {
            name: 'variant_records',
            macro: 'has_many',
            class_name: 'ActiveStorage::VariantRecord',
            options: {
              class_name: 'ActiveStorage::VariantRecord',
              dependent: false,
            },
          },
          {
            name: 'preview_image_attachment',
            macro: 'has_one',
            class_name: 'ActiveStorage::Attachment',
            options: {
              class_name: 'ActiveStorage::Attachment',
              as: 'record',
              inverse_of: 'record',
              dependent: 'destroy',
              strict_loading: false,
            },
          },
          {
            name: 'preview_image_blob',
            macro: 'has_one',
            class_name: 'ActiveStorage::Blob',
            options: {
              through: 'preview_image_attachment',
              class_name: 'ActiveStorage::Blob',
              source: 'blob',
              strict_loading: false,
            },
          },
        ],
      },
      {
        model_name: 'ActionMailbox::InboundEmail',
        table_name: 'action_mailbox_inbound_emails',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'status',
            type: 'integer',
            null: false,
            default: '0',
          },
          {
            name: 'message_id',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'message_checksum',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'raw_email_attachment',
            macro: 'has_one',
            class_name: 'ActiveStorage::Attachment',
            options: {
              class_name: 'ActiveStorage::Attachment',
              as: 'record',
              inverse_of: 'record',
              dependent: 'destroy',
              strict_loading: false,
            },
          },
          {
            name: 'raw_email_blob',
            macro: 'has_one',
            class_name: 'ActiveStorage::Blob',
            options: {
              through: 'raw_email_attachment',
              class_name: 'ActiveStorage::Blob',
              source: 'blob',
              strict_loading: false,
            },
          },
        ],
      },
      {
        model_name: 'Blazer::Query',
        table_name: 'blazer_queries',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'creator_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'description',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'statement',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'data_source',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'status',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'creator',
            macro: 'belongs_to',
            class_name: 'AdminUser',
            options: {
              optional: true,
              class_name: 'AdminUser',
            },
          },
          {
            name: 'checks',
            macro: 'has_many',
            class_name: 'Check',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'dashboard_queries',
            macro: 'has_many',
            class_name: 'DashboardQuery',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'dashboards',
            macro: 'has_many',
            class_name: 'Dashboard',
            options: {
              through: 'dashboard_queries',
            },
          },
          {
            name: 'audits',
            macro: 'has_many',
            class_name: 'Audit',
            options: {},
          },
        ],
      },
      {
        model_name: 'Blazer::DashboardQuery',
        table_name: 'blazer_dashboard_queries',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'dashboard_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'query_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'position',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'dashboard',
            macro: 'belongs_to',
            class_name: 'Dashboard',
            options: {},
          },
          {
            name: 'query',
            macro: 'belongs_to',
            class_name: 'Query',
            options: {},
          },
        ],
      },
      {
        model_name: 'Blazer::Dashboard',
        table_name: 'blazer_dashboards',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'creator_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'creator',
            macro: 'belongs_to',
            class_name: 'AdminUser',
            options: {
              optional: true,
              class_name: 'AdminUser',
            },
          },
          {
            name: 'dashboard_queries',
            macro: 'has_many',
            class_name: 'DashboardQuery',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'queries',
            macro: 'has_many',
            class_name: 'Query',
            options: {
              through: 'dashboard_queries',
            },
          },
        ],
      },
      {
        model_name: 'Blazer::Check',
        table_name: 'blazer_checks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'creator_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'query_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'state',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'schedule',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'emails',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'slack_channels',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'check_type',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'message',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'last_run_at',
            type: 'datetime',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'creator',
            macro: 'belongs_to',
            class_name: 'AdminUser',
            options: {
              optional: true,
              class_name: 'AdminUser',
            },
          },
          {
            name: 'query',
            macro: 'belongs_to',
            class_name: 'Query',
            options: {},
          },
        ],
      },
      {
        model_name: 'Blazer::Audit',
        table_name: 'blazer_audits',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'query_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'statement',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'data_source',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: true,
            default: null,
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'AdminUser',
            options: {
              optional: true,
              class_name: 'AdminUser',
            },
          },
          {
            name: 'query',
            macro: 'belongs_to',
            class_name: 'Query',
            options: {
              optional: true,
            },
          },
        ],
      },
      {
        model_name: 'Timeseries',
        table_name: 'timeseries',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'text',
            null: false,
            default: null,
          },
          {
            name: 'measurements',
            type: 'jsonb',
            null: false,
            default: '[]',
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [],
      },
      {
        model_name: 'MarriageMembership',
        table_name: 'marriage_memberships',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'marriage_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'marriage',
            macro: 'belongs_to',
            class_name: 'Marriage',
            options: {},
          },
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
        ],
      },
      {
        model_name: 'AuthToken',
        table_name: 'auth_tokens',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'secret',
            type: 'text',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'last_used_at',
            type: 'datetime',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
          {
            name: 'requests',
            macro: 'has_many',
            class_name: 'Request',
            options: {
              dependent: 'nullify',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'QuizQuestionAnswer',
        table_name: 'quiz_question_answers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'question_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'content',
            type: 'text',
            null: false,
            default: null,
          },
          {
            name: 'is_correct',
            type: 'boolean',
            null: false,
            default: 'false',
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'question',
            macro: 'belongs_to',
            class_name: 'QuizQuestion',
            options: {
              class_name: 'QuizQuestion',
            },
          },
          {
            name: 'selections',
            macro: 'has_many',
            class_name: 'QuizQuestionAnswerSelection',
            options: {
              dependent: 'destroy',
              class_name: 'QuizQuestionAnswerSelection',
              foreign_key: 'answer_id',
              inverse_of: 'answer',
            },
          },
          {
            name: 'answering_participations',
            macro: 'has_many',
            class_name: 'QuizParticipation',
            options: {
              through: 'selections',
              source: 'participation',
            },
          },
        ],
      },
      {
        model_name: 'QuizQuestion',
        table_name: 'quiz_questions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'quiz_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'content',
            type: 'text',
            null: false,
            default: null,
          },
          {
            name: 'status',
            type: 'string',
            null: false,
            default: 'open',
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'quiz',
            macro: 'belongs_to',
            class_name: 'Quiz',
            options: {},
          },
          {
            name: 'answers',
            macro: 'has_many',
            class_name: 'QuizQuestionAnswer',
            options: {
              dependent: 'destroy',
              class_name: 'QuizQuestionAnswer',
              foreign_key: 'question_id',
              inverse_of: 'question',
            },
          },
          {
            name: 'answer_selections',
            macro: 'has_many',
            class_name: 'QuizQuestionAnswerSelection',
            options: {
              through: 'answers',
              source: 'selections',
            },
          },
        ],
      },
      {
        model_name: 'QuizQuestionAnswerSelection',
        table_name: 'quiz_question_answer_selections',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'answer_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'participation_id',
            type: 'integer',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'answer',
            macro: 'belongs_to',
            class_name: 'QuizQuestionAnswer',
            options: {
              class_name: 'QuizQuestionAnswer',
            },
          },
          {
            name: 'participation',
            macro: 'belongs_to',
            class_name: 'QuizParticipation',
            options: {
              class_name: 'QuizParticipation',
            },
          },
          {
            name: 'participant',
            macro: 'has_one',
            class_name: 'User',
            options: {
              through: 'participation',
            },
          },
          {
            name: 'question',
            macro: 'has_one',
            class_name: 'QuizQuestion',
            options: {
              through: 'answer',
            },
          },
          {
            name: 'quiz',
            macro: 'has_one',
            class_name: 'Quiz',
            options: {
              through: 'question',
            },
          },
        ],
      },
      {
        model_name: 'QuizParticipation',
        table_name: 'quiz_participations',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'quiz_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'participant_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'display_name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'quiz',
            macro: 'belongs_to',
            class_name: 'Quiz',
            options: {},
          },
          {
            name: 'participant',
            macro: 'belongs_to',
            class_name: 'User',
            options: {
              class_name: 'User',
            },
          },
          {
            name: 'quiz_question_answer_selections',
            macro: 'has_many',
            class_name: 'QuizQuestionAnswerSelection',
            options: {
              dependent: 'destroy',
              foreign_key: 'participation_id',
              inverse_of: 'participation',
            },
          },
          {
            name: 'correct_answer_selections',
            macro: 'has_many',
            class_name: 'QuizQuestionAnswerSelection',
            options: {
              class_name: 'QuizQuestionAnswerSelection',
              foreign_key: 'participation_id',
              inverse_of: 'participation',
            },
          },
        ],
      },
      {
        model_name: 'Marriage',
        table_name: 'marriages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'check_ins',
            macro: 'has_many',
            class_name: 'CheckIn',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'emotional_needs',
            macro: 'has_many',
            class_name: 'EmotionalNeed',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'memberships',
            macro: 'has_many',
            class_name: 'MarriageMembership',
            options: {
              dependent: 'destroy',
              class_name: 'MarriageMembership',
            },
          },
          {
            name: 'partners',
            macro: 'has_many',
            class_name: 'User',
            options: {
              through: 'memberships',
              source: 'user',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'CheckInSubmission',
        table_name: 'check_in_submissions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'check_in_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'check_in',
            macro: 'belongs_to',
            class_name: 'CheckIn',
            options: {},
          },
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
        ],
      },
      {
        model_name: 'Request',
        table_name: 'requests',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'url',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'handler',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'referer',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'params',
            type: 'jsonb',
            null: true,
            default: null,
          },
          {
            name: 'method',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'format',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'status',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'view',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'db',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'ip',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'user_agent',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'requested_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'location',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'isp',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'request_id',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'auth_token_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'admin_user_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'total',
            type: 'integer',
            null: true,
            default: null,
          },
        ],
        associations: [
          {
            name: 'admin_user',
            macro: 'belongs_to',
            class_name: 'AdminUser',
            options: {
              optional: true,
            },
          },
          {
            name: 'auth_token',
            macro: 'belongs_to',
            class_name: 'AuthToken',
            options: {
              optional: true,
            },
          },
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {
              optional: true,
            },
          },
        ],
      },
      {
        model_name: 'Event',
        table_name: 'events',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'type',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'admin_user_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'data',
            type: 'jsonb',
            null: true,
            default: null,
          },
          {
            name: 'ip',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'isp',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'location',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'stack_trace',
            type: 'string',
            null: false,
            default: '{}',
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'user_agent',
            type: 'text',
            null: true,
            default: null,
          },
        ],
        associations: [
          {
            name: 'admin_user',
            macro: 'belongs_to',
            class_name: 'AdminUser',
            options: {
              optional: true,
            },
          },
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {
              optional: true,
            },
          },
        ],
      },
      {
        model_name: 'Deploy',
        table_name: 'deploys',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'git_sha',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [],
      },
      {
        model_name: 'DatamigrationRun',
        table_name: 'datamigration_runs',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'developer',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'completed_at',
            type: 'datetime',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [],
      },
      {
        model_name: 'CspReport',
        table_name: 'csp_reports',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'document_uri',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'violated_directive',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'original_policy',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'ip',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'referrer',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'blocked_uri',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'user_agent',
            type: 'text',
            null: false,
            default: null,
          },
        ],
        associations: [],
      },
      {
        model_name: 'CiStepResult',
        table_name: 'ci_step_results',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'seconds',
            type: 'float',
            null: false,
            default: null,
          },
          {
            name: 'started_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'stopped_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'passed',
            type: 'boolean',
            null: false,
            default: 'false',
          },
          {
            name: 'github_run_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'github_run_attempt',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'branch',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'sha',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
        ],
      },
      {
        model_name: 'AdminUser',
        table_name: 'admin_users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'email',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'events',
            macro: 'has_many',
            class_name: 'Event',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'Workout',
        table_name: 'workouts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'time_in_seconds',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'rep_totals',
            type: 'jsonb',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'publicly_viewable',
            type: 'boolean',
            null: false,
            default: 'false',
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
        ],
      },
      {
        model_name: 'Store',
        table_name: 'stores',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'viewed_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'notes',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'private',
            type: 'boolean',
            null: false,
            default: 'false',
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
          {
            name: 'items',
            macro: 'has_many',
            class_name: 'Item',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'Quiz',
        table_name: 'quizzes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'owner_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'status',
            type: 'string',
            null: false,
            default: 'unstarted',
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'current_question_number',
            type: 'integer',
            null: false,
            default: '1',
          },
        ],
        associations: [
          {
            name: 'owner',
            macro: 'belongs_to',
            class_name: 'User',
            options: {
              class_name: 'User',
            },
          },
          {
            name: 'participations',
            macro: 'has_many',
            class_name: 'QuizParticipation',
            options: {
              dependent: 'destroy',
              class_name: 'QuizParticipation',
              inverse_of: 'quiz',
              extend: ['Hashid::Rails::ClassMethods'],
            },
          },
          {
            name: 'questions',
            macro: 'has_many',
            class_name: 'QuizQuestion',
            options: {
              dependent: 'destroy',
              class_name: 'QuizQuestion',
              inverse_of: 'quiz',
              extend: ['Hashid::Rails::ClassMethods'],
            },
          },
          {
            name: 'participants',
            macro: 'has_many',
            class_name: 'User',
            options: {
              through: 'participations',
              extend: ['Hashid::Rails::ClassMethods'],
            },
          },
          {
            name: 'question_answers',
            macro: 'has_many',
            class_name: 'QuizQuestionAnswer',
            options: {
              through: 'questions',
              source: 'answers',
              class_name: 'QuizQuestionAnswer',
              extend: ['Hashid::Rails::ClassMethods'],
            },
          },
          {
            name: 'ordered_questions',
            macro: 'has_many',
            class_name: 'QuizQuestion',
            options: {
              dependent: 'destroy',
              class_name: 'QuizQuestion',
              inverse_of: 'quiz',
              extend: ['Hashid::Rails::ClassMethods'],
            },
          },
          {
            name: 'current_question',
            macro: 'has_one',
            class_name: 'QuizQuestion',
            options: {
              class_name: 'QuizQuestion',
              inverse_of: 'quiz',
            },
          },
        ],
      },
      {
        model_name: 'NeedSatisfactionRating',
        table_name: 'need_satisfaction_ratings',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'emotional_need_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'check_in_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'score',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'emotional_need',
            macro: 'belongs_to',
            class_name: 'EmotionalNeed',
            options: {},
          },
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
          {
            name: 'check_in',
            macro: 'belongs_to',
            class_name: 'CheckIn',
            options: {},
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'LogShare',
        table_name: 'log_shares',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'log_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'email',
            type: 'text',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'log',
            macro: 'belongs_to',
            class_name: 'Log',
            options: {},
          },
          {
            name: 'user',
            macro: 'has_one',
            class_name: 'User',
            options: {
              through: 'log',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'TextLogEntryDatum',
        table_name: 'text_log_entry_data',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'data',
            type: 'text',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'log_entry',
            macro: 'has_one',
            class_name: 'LogEntry',
            options: {
              as: 'log_entry_datum',
              touch: true,
              dependent: 'destroy',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'NumberLogEntryDatum',
        table_name: 'number_log_entry_data',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'data',
            type: 'float',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'log_entry',
            macro: 'has_one',
            class_name: 'LogEntry',
            options: {
              as: 'log_entry_datum',
              touch: true,
              dependent: 'destroy',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'Log',
        table_name: 'logs',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'description',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'slug',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'data_label',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'data_type',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'publicly_viewable',
            type: 'boolean',
            null: false,
            default: 'false',
          },
          {
            name: 'reminder_time_in_seconds',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'reminder_last_sent_at',
            type: 'datetime',
            null: true,
            default: null,
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
          {
            name: 'log_entries',
            macro: 'has_many',
            class_name: 'LogEntry',
            options: {
              dependent: 'destroy',
              inverse_of: 'log',
            },
          },
          {
            name: 'log_shares',
            macro: 'has_many',
            class_name: 'LogShare',
            options: {
              dependent: 'destroy',
              inverse_of: 'log',
            },
          },
        ],
      },
      {
        model_name: 'LogEntry',
        table_name: 'log_entries',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'log_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'log_entry_datum_type',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'log_entry_datum_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'note',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'log',
            macro: 'belongs_to',
            class_name: 'Log',
            options: {},
          },
          {
            name: 'user',
            macro: 'has_one',
            class_name: 'User',
            options: {
              through: 'log',
            },
          },
          {
            name: 'log_entry_datum',
            macro: 'belongs_to',
            class_name: 'LogEntryDatum',
            options: {
              inverse_of: 'log_entry',
              dependent: 'destroy',
              polymorphic: true,
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'Item',
        table_name: 'items',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'store_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'needed',
            type: 'integer',
            null: false,
            default: '1',
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'store',
            macro: 'belongs_to',
            class_name: 'Store',
            options: {},
          },
          {
            name: 'user',
            macro: 'has_one',
            class_name: 'User',
            options: {
              through: 'store',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'EmotionalNeed',
        table_name: 'emotional_needs',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'marriage_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'name',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'description',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'marriage',
            macro: 'belongs_to',
            class_name: 'Marriage',
            options: {},
          },
          {
            name: 'need_satisfaction_ratings',
            macro: 'has_many',
            class_name: 'NeedSatisfactionRating',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'Comment',
        table_name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'path',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'content',
            type: 'text',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'parent_id',
            type: 'integer',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {
              optional: true,
            },
          },
          {
            name: 'parent',
            macro: 'belongs_to',
            class_name: 'Comment',
            options: {
              class_name: 'Comment',
              optional: true,
            },
          },
          {
            name: 'children',
            macro: 'has_many',
            class_name: 'Comment',
            options: {
              class_name: 'Comment',
              foreign_key: 'parent_id',
              dependent: 'restrict_with_exception',
              inverse_of: 'parent',
            },
          },
        ],
      },
      {
        model_name: 'CheckIn',
        table_name: 'check_ins',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'marriage_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'marriage',
            macro: 'belongs_to',
            class_name: 'Marriage',
            options: {},
          },
          {
            name: 'check_in_submissions',
            macro: 'has_many',
            class_name: 'CheckInSubmission',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'need_satisfaction_ratings',
            macro: 'has_many',
            class_name: 'NeedSatisfactionRating',
            options: {
              dependent: 'destroy',
            },
          },
        ],
      },
      {
        model_name: 'JsonPreference',
        table_name: 'json_preferences',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'user_id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'preference_type',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'json',
            type: 'jsonb',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [
          {
            name: 'user',
            macro: 'belongs_to',
            class_name: 'User',
            options: {},
          },
        ],
      },
      {
        model_name: 'User',
        table_name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'email',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'google_sub',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'public_name',
            type: 'string',
            null: true,
            default: null,
          },
        ],
        associations: [
          {
            name: 'auth_tokens',
            macro: 'has_many',
            class_name: 'AuthToken',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'logs',
            macro: 'has_many',
            class_name: 'Log',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'log_shares',
            macro: 'has_many',
            class_name: 'LogShare',
            options: {
              through: 'logs',
            },
          },
          {
            name: 'quizzes',
            macro: 'has_many',
            class_name: 'Quiz',
            options: {
              dependent: 'destroy',
              foreign_key: 'owner_id',
              inverse_of: 'owner',
            },
          },
          {
            name: 'quiz_participations',
            macro: 'has_many',
            class_name: 'QuizParticipation',
            options: {
              dependent: 'destroy',
              foreign_key: 'participant_id',
              inverse_of: 'participant',
            },
          },
          {
            name: 'requests',
            macro: 'has_many',
            class_name: 'Request',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'stores',
            macro: 'has_many',
            class_name: 'Store',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'items',
            macro: 'has_many',
            class_name: 'Item',
            options: {
              through: 'stores',
            },
          },
          {
            name: 'log_entries',
            macro: 'has_many',
            class_name: 'LogEntry',
            options: {
              through: 'logs',
            },
          },
          {
            name: 'workouts',
            macro: 'has_many',
            class_name: 'Workout',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'need_satisfaction_ratings',
            macro: 'has_many',
            class_name: 'NeedSatisfactionRating',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'check_in_submissions',
            macro: 'has_many',
            class_name: 'CheckInSubmission',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'json_preferences',
            macro: 'has_many',
            class_name: 'JsonPreference',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'events',
            macro: 'has_many',
            class_name: 'Event',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'ci_step_results',
            macro: 'has_many',
            class_name: 'CiStepResult',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'comments',
            macro: 'has_many',
            class_name: 'Comment',
            options: {
              dependent: 'nullify',
            },
          },
          {
            name: 'marriage_membership',
            macro: 'has_one',
            class_name: 'MarriageMembership',
            options: {
              dependent: 'destroy',
            },
          },
          {
            name: 'marriage',
            macro: 'has_one',
            class_name: 'Marriage',
            options: {
              through: 'marriage_membership',
            },
          },
          {
            name: 'default_workout',
            macro: 'has_one',
            class_name: 'JsonPreference',
            options: {
              class_name: 'JsonPreference',
              inverse_of: 'user',
            },
          },
          {
            name: 'emoji_boosts',
            macro: 'has_one',
            class_name: 'JsonPreference',
            options: {
              class_name: 'JsonPreference',
              inverse_of: 'user',
            },
          },
          {
            name: 'versions',
            macro: 'has_many',
            class_name: 'PaperTrail::Version',
            options: {
              class_name: 'PaperTrail::Version',
              as: 'item',
            },
          },
        ],
      },
      {
        model_name: 'IpBlock',
        table_name: 'ip_blocks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'ip',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'reason',
            type: 'text',
            null: true,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'isp',
            type: 'string',
            null: true,
            default: null,
          },
          {
            name: 'location',
            type: 'string',
            null: true,
            default: null,
          },
        ],
        associations: [],
      },
      {
        model_name: 'BannedPathFragment',
        table_name: 'banned_path_fragments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            null: false,
            default: null,
          },
          {
            name: 'value',
            type: 'string',
            null: false,
            default: null,
          },
          {
            name: 'created_at',
            type: 'datetime',
            null: false,
            default: null,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            null: false,
            default: null,
          },
        ],
        associations: [],
      },
    ],
  },
};

(window as Window & typeof globalThis & { davidrunger: object }).davidrunger =
  davidrunger;
