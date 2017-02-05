Rails.application.routes.draw do
  root to: "static#index"
  devise_for :users

  resources :users, only: [:show]

  resources :stories do
    resources :story_likes, only: [:create]
    resources :comments, only: [:create, :new]
  end
  
  resources :story_likes, only: [:destroy]
  resources :comments, only: [:show, :edit, :update, :destroy]
end