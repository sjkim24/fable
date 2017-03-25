class Api::FollowsController < ApplicationController
  
  def create
    @follow = Follow.new(follower_id: current_user.id, following_id: params[:user_id])
    
    if @follow.save
      render json: @follow
    else
      render json: "Error"
    end
  end
  
  def destroy
    user_id = params[:user][:user_id]
    @follow = Follow.where(follower_id: current_user.id, following_id: user_id)[0]
    
    if @follow.destroy
      render json: @follow
    else
      render json: "Error"
    end
  end
end