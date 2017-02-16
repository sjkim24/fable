class FollowsController < ApplicationController
  
  def create
    @follow = Follow.new(follower_id: current_user.id, following_id: params[:user_id])
    
    if @follow.save
      redirect_to user_url(params[:user_id])
    else
      flash.now[:errors] = "Error"
    end
  end
  
  def destroy
    @follow = Follow.find(params[:id])
    user_id = @follow.following_id
    
    if @follow.destroy
      redirect_to user_url(user_id)
    else
      flash.now[:errors] = "Error"
    end
  end
end