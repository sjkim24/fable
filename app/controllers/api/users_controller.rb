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
    binding.pry
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
  
  # def user_stories
  #   @user = User.find(params[:id])
  #   @stories = @user.stories
  #   
  #   render :user_stories
  # end
  # 
  # def user_comments
  #   @user = User.find(params[:id])
  #   @comments = @user.comments
  #   
  #   render :user_comments
  # end
  # 
  # def user_bookmarks
  #   @user = User.find(params[:id])
  #   @bookmarks = @user.bookmarks
  #   
  #   render :user_bookmarks
  # end
  
  private
    def user_params
      params.require(:user)
        .permit(:username, :user_desc, :photo, :fullname)
    end
end