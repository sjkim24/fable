class Api::CommentsController < ApplicationController
  # shows user's all comments in profile page
  # def index
  #   if params.has_key?(:user_id)
  #     @comments = Comment.find_by_user_id(params[:user_id])
  #     @user = User.find(params[:user_id])
  #   else
  #     @comments = Comment.all.includes(:users)
  #   end
  # 
  #   render :index
  # end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.story_id = params[:story_id]

    if @comment.save
      render json: @comment
    else
      render json: "Error"
    end
  end

  # def new
  #   @comment = Comment.new
  #   render :new
  # end
  # 
  # def edit
  #   @comment = Comment.find(params[:id])
  #   render :edit
  # end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(comment_params)
      redirect_to comment_url(@comment.user_id)
    else
      flash.now[:errors] = @story.errors.full_messages
      render :edit
    end
  end

  def destroy
    @comment = Comment.find(params[:comment][:id])
    story_id = @comment.story_id
    @comment.destroy
    redirect_to story_url(story_id)
  end
  
  def get_replies
    comment = Comment.find(params[:id])
    @replies = comment.replies
    
    render :get_replies
  end

  private
    def comment_params
      params.require(:comment)
        .permit(:content, :parent_comment_id)
    end

end