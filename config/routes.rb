Rails.application.routes.draw do
  root to: "static#index"
  devise_for :users
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:show, :edit, :update] do
      resources :stories, only: [:index]
      resources :comments, only: [:index]
      resources :bookmarks, only: [:index]
      resources :follows, only: [:create]
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
    delete 'story_likes/destory', :to => 'story_likes#destroy'
    resources :bookmarks, only: [:destroy]
    resources :follows, only: [:destroy]
  end
  
  get 'users/:id/stories', :to => 'users#user_stories'
  get 'users/:id/comments', :to => 'users#user_comments'
  get 'users/:id/bookmarks', :to => 'users#user_bookmarks'
  get 'users/:id/followers', :to => 'users#user_followers'
  get 'users/:id/followings', :to => 'users#user_followings'
end