class CommentLikesController < ApplicationController
  
  # redo this function
  def create
    @like = CommentLike.new(user_id: current_user.id, comment_id: params[:comment_id])
    
    if @like.save!
      redirect_to story_url(params[:story_id])
    else
      flash.now[:errors] = @like.errors.full_messages
    end
  end
  
  # redo this function
  def destroy
    # # complete unliking a story
    # binding.pry
    # @liked = Like.where(user_id: current_user.id, story_id: @story.id).
    # @like.destroy
    # 
    
    binding.pry
    redirect_to story_url(params[:story_id])
  end

end