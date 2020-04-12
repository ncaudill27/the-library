Rails.application.routes.draw do
  post 'auth_user' => 'authentication#authenticate_user'
  
  namespace :api do
    namespace :v1 do
      resources :users
      resources :clubs
      resources :comments
      resources :boards
    end
  end
end