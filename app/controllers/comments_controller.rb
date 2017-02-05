class CommentsController < ApplicationController

  def create
    @comment = Comment.new(story_params)

    @comment.user_id = current_user.id

    if @comment.save!
      redirect_to story_url(@comment.story_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new
    end
  end

  def new
    @comment = Comment.new
    render :new
  end

  def edit
    @comment.find(params[:id])
    render :edit
  end

  def show
    @show = Show.find(params[:id])
    render :shoe
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(comment_params)
      redirect_to story_url(@comment.user_id)
    else
      flash.now[:errors] = @story.errors.full_messages
      render :edit
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    story_id = @comment.story_id
    @comment.destroy
    redirect_to story_url(story_id)
  end

  private
    def comment_params
      params.require(:comment)
        .permit(:title, :content)
    end

end
