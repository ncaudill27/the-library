Rails.application.routes.draw do
  resources :sessions, only: [:create]
  
  namespace :api do
    namespace :v1 do
      resources :users
      resources :clubs
      resources :comments
      resources :boards
    end
  end
end