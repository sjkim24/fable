Paperclip::Attachment.default_options[:storage] = :s3
Paperclip::Attachment.default_options[:s3_protocol] = 'http'
Paperclip::Attachment.default_options[:s3_region] = ENV['AWS_REGION']
Paperclip::Attachment.default_options[:s3_credentials] =
  { :bucket => ENV['AWS_DEV_BUCKET'],
    :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
    :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'] }

Paperclip::Attachment.default_options[:url] = ':s3_domain_url'
Paperclip::Attachment.default_options[:path] = '/:class/:attachment/:id_partition/:style/:filename'