class Api::CommentLikesController < ApplicationController
  
  def create
    @like = CommentLike.new(user_id: current_user.id, comment_id: params[:comment_id])
    @story_id = Comment.find(params[:comment_id]).story.id
    
    if @like.save
      render json: @like
    else
      render json: "Error"
    end
  end
  
  def destroy
    comment_id = params[:comment_like][:comment_id]
    @like = CommentLike.where(user_id: current_user.id, comment_id: comment_id)[0]
    
    if @like.destroy
      render json: @like
    else
      render json: "Error"
    end
  end
  
end