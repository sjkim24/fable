Rails.application.routes.draw do
  root to: "static#index"
  devise_for :users

  resources :users, only: [:show, :edit, :update] do
    resources :stories, only: [:index]
    resources :comments, only: [:index]
    resources :bookmarks, only: [:index]
    resources :follows, only: [:create, :destroy]
  end

  resources :stories do
    resources :comments, only: [:create, :new]
    resources :story_likes, only: [:create]
    resources :bookmarks, only: [:create]
  end
  
  resources :comments, only: [:show, :edit, :update, :destroy] do
    resources :comment_likes, only: [:create]
  end
  
  resources :comment_likes, only: [:destroy]
  resources :story_likes, only: [:destroy]
  resources :bookmarks, only: [:destroy]
  
  get 'users/:id/stories', :to => 'users#user_stories'
  get 'users/:id/comments', :to => 'users#user_comments'
  get 'users/:id/bookmarks', :to => 'users#user_bookmarks'
end