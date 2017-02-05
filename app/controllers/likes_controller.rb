class LikesController < ApplicationController

  def create
    @like = Like.new(user_id: current_user.id, story_id: params[:story_id])
    
    if @like.save!
      redirect_to story_url(params[:story_id])
    else
      flash.now[:errors] = @like.errors.full_messages
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    
    redirect_to story_url(params[:story_id])
  end

end
