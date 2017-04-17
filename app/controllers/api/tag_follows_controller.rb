class Api::TagFollowsController < ApplicationController
  before_action :authenticate_user!
  
  def create
    if params[:tag_id]
      @tag_follow = TagFollow.new(user_id: current_user.id, tag_id: params[:tag_id])
    else
      tag = Tag.find_or_create_by(tag_desc: params[:tag_desc])
      @tag_follow = TagFollow.new(user_id: current_user.id, tag_id: tag.id)
    end
    
    if @tag_follow.save
      @tag_follows = current_user.tag_follows
      render :tag_follows
    else
      render json: { error: "Data already exists by #{params[:tag_id]}"}
    end
  end
  
  def destroy
    @tag_follow = TagFollow.find(params[:id])
    
    if @tag_follow.destroy
      @tag_follows = current_user.tag_follows
      
      render :tag_follows
    else
      render json: "Error"
    end
  end
end