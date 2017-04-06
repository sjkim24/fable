class Api::TagFollowsController < ApplicationController
  
  def create
    @tag_follow = TagFollow.new(user_id: current_user.id, tag_id: params[:tag_id])
    
    if @tag_follow.save
      render json: @tag_follow
    else
      render json: "Error"
    end
  end
  
  def destroy
    @tag_follow = TagFollow.where(user_id: current_user.id, tag_id: params[:tag_id])[0]
    
    if @tag_follow.destroy
      render json: @tag_follow
    else
      render json: "Error"
    end
  end
end