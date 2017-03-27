class Api::StoryLikesController < ApplicationController

  def create
    @like = StoryLike.new(user_id: current_user.id, story_id: params[:story_id])

    if @like.save
      render json: @like
    else
      render json: "Error"
    end
  end

  def destroy
    story_id = params[:story_like][:story_id]
    @like = StoryLike.where(user_id: current_user.id, story_id: story_id)[0]
    
    if @like.destroy
      render json: @like
    else
      render json: "Error"
    end
  end

end