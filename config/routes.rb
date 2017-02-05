Rails.application.routes.draw do
  root to: "static#index"
  devise_for :users

  resources :users, only: [:show]

  resources :stories do
    resources :comments, only: [:new, :create]
  end

  resources :comments, only: [:show, :edit, :update, :destroy]
end
