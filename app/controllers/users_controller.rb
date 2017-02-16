class UsersController < ApplicationController
  
  def show
    @user = User.find(params[:id])
    @comments = @user.comments
    @stories = @user.stories
    
    if @user.following?(current_user.id, @user.id)
      @follow = Follow.where(follower_id: current_user.id, following_id: @user.id)[0]
    end
    
    render :show
  end
  
  def edit
    @user = User.find(params[:id])
    
    render :edit
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
  
  def user_stories
    @user = User.find(params[:id])
    @stories = @user.stories
    
    render :user_stories
  end
  
  def user_comments
    @user = User.find(params[:id])
    @comments = @user.comments
    
    render :user_comments
  end
  
  def user_bookmarks
    @user = User.find(params[:id])
    @bookmarks = @user.bookmarks
    
    render :user_bookmarks
  end
  
  private
    def user_params
      params.require(:user)
        .permit(:username, :user_desc, :photo)
    end
end