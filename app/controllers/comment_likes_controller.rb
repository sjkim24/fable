class CommentLikesController < ApplicationController
  
  def create
    @like = CommentLike.new(user_id: current_user.id, comment_id: params[:comment_id])
    @story_id = Comment.find(params[:comment_id]).story.id
    
    if @like.save!
      redirect_to story_url(@story_id)
    else
      flash.now[:errors] = @like.errors.full_messages
    end
  end
  
  def destroy
    @like = CommentLike.find(params[:comment_like][:id])
    
    if @like.destroy
      redirect_to story_url(params[:id])
    else
      flash.now[:errors] = "Error"
    end
  end
  
end