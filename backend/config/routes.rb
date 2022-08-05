Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: %i[index show create edit update destroy] do
        collection do
          post 'get_user'
        end
      end
      
      resources :items, only: %i[index show create edit update destroy]
      resources :votes, only: %i[index show create] do
        collection do
          post 'get_vote'
        end
      end
    end
  end
end
