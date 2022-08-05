Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:4000" # React側はポート番号4000で作るので「localhost:4000」を指定

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
