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
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errros.full_messages
      render :edit
    end
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
        .permit(:username, :user_desc, :photo)
    end
end