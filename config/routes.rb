Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :clubs    
      resources :comments, except: [:index, :show]
      resources :boards, except: [:show]
    end
  end
end