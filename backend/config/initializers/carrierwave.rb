CarrierWave.configure do |config|
  config.asset_host = "http://localhost:4001"
  config.storage = :file
  config.cache_storage = :file
end
