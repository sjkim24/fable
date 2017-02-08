class UsersController < ApplicationController
  
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
  
  def show
    @user = User.find(params[:id])
    @comments = @user.comments
    @stories = @user.stories
  end

  private
    def users_params
      params.require(:person).permit(:username, :user_desc)
    end
end