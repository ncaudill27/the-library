Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :clubs
      resources :comments
      resources :boards
    end
  end
end