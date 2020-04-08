Rails.application.routes.draw do
  resources :comments
  resources :boards
  namespace :api do
    namespace :v1 do
      resources :users
      resources :clubs    
    end
  end
end
