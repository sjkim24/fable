Rails.application.routes.draw do
  root to: "static#index"
  devise_for :users, controllers: {sessions: "sessions", registrations: "users/registrations"}
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:update] do
      resources :stories, only: [:index]
      resources :comments, only: [:index]
      resources :bookmarks, only: [:index]
      resources :follows, only: [:create]
    end

    resources :stories do
      resources :comments, only: [:create]
      resources :story_likes, only: [:create]
      resources :bookmarks, only: [:create]
    end
    
    resources :comments, only: [:show, :update, :destroy] do
      resources :comment_likes, only: [:create]
    end
    
    delete 'story_likes/destory', :to => 'story_likes#destroy'
    delete 'comment_likes/destroy', :to => 'comment_likes#destroy'
    delete 'bookmarks/destory', :to => 'bookmarks#destroy'
    delete 'follows/destroy', :to => 'follows#destroy'
    
    get 'users/:username', :to => 'users#show'
    get 'users/:id/followers', :to => 'users#followers'
    get 'users/:id/followings', :to => 'users#followings'
    get 'users/:id/responses', :to => 'users#responses'
    
    get 'stories/:id/comments', :to => 'stories#get_comments_only'
    get 'comments/:id/replies', :to => 'comments#get_replies'
    
    get 'current_user', :to => 'current_user#get_current_user'
  end
end