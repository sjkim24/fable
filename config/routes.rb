Rails.application.routes.draw do
  root to: "static#index"
  devise_for :users

  resources :users, only: [:show]

  resources :stories do
    resources :story_likes, only: [:create]
    resources :comments, only: [:create, :new]
  end
  
  resources :comments, only: [:show, :edit, :update, :destroy] do
    resources :comment_likes, only: [:create]
  end
  
  resources :comment_likes, only: [:destroy]
  resources :story_likes, only: [:destroy]
end