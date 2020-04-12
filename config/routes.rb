Rails.application.routes.draw do
  post 'login' => 'authentication#login'
  
  namespace :api do
    namespace :v1 do
      resources :users
      resources :clubs
      resources :comments
      resources :boards
    end
  end
end