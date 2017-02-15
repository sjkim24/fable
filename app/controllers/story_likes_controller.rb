class StoryLikesController < ApplicationController

  def create
    @like = StoryLike.new(user_id: current_user.id, story_id: params[:story_id])
    
    if @like.save
      redirect_to story_url(params[:story_id])
    else
      flash.now[:errors] = @like.errors.full_messages
    end
  end

  def destroy
    @like = StoryLike.find(params[:story_like][:id])
    
    if @like.destroy
      redirect_to story_url(params[:id])
    else
      flash.now[:errors] = "Error"
    end
  end

end