Rails.application.routes.draw do
  devise_for :users
  root 'top_pages#index'
  resources :top_pages, only: [:new, :create]
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end