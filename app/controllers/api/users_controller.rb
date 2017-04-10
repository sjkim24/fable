class Api::UsersController < ApplicationController
  
  def show
    username = params[:username].gsub("@", "")
    @user = User.find_by_username(username)
    @latest = @user.stories.last(3)
    @recommends = @user.recommends.order("created_at DESC")
    @comments = @user.get_comments_only

    render :show
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render :user
    else
      render json: "Error"
    end
  end
  
  def edit
    @user = User.find(params[:id])
    
    render :edit
  end
  
  def followings
    @user = User.find(params[:id])
    @followings = @user.followings

    render :followings
  end
  
  def followers
    @user = User.find(params[:id])
    @followers = @user.followers
    
    render :followers
  end
  
  def responses
    @user = User.find(params[:id])
    @comments = @user.get_comments_only
    
    render :responses
  end
  
  def tag_follows
    @user = User.find(params[:id])
    @tag_follows = @user.tag_follows
    
    render :tag_follows
  end
  
  def stories
    username = params[:username].gsub("@", "")
    user = User.find_by_username(username)
    @stories = user.stories.includes(:user).order("created_at DESC")
    
    render :stories
  end
  
  private
    def user_params
      params.require(:user)
        .permit(:id, :username, :user_desc, :photo, :fullname)
    end
end