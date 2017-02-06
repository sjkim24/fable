class StoriesController < ApplicationController
  # before_action :user_signed_in?

  def index
    @stories = Story.all
    render :index
  end

  def create
    @title = "Fable | Share your tales with the world"
    @story = Story.new(story_params)

    @story.user_id = current_user.id

    if @story.save!
      redirect_to story_url(@story)
    else
      flash.now[:errors] = @story.errors.full_messages
      render :new
    end
  end

  def new
    @story = Story.new
    render :new
  end

  def edit
    @story = Story.find(params[:id])
    @comments = @story.comments
    render :edit
  end

  def show
    @story = Story.find(params[:id])
    @comments = @story.comments    
    @story_likes = @story.likes
    # current user's story like object stored in an array
    
    # StoryLike.liked?(current_user.id, @story.class.name.downcase, @story_id)
    # @current_user_like = StoryLike.where(user_id: current_user.id, story_id: @story.id)
    # boolean value of whether the current user liked this current story or not
    # @current_user_like[0].liked?
    @story_liked = @story.liked?(@story.id, current_user.id)
    @like_id = @story.like_id(@story.id, current_user.id) if @story_liked
        
    render :show
  end

  def update
    @story = Story.find(params[:id])
    if @story.update_attributes(story_params)
      redirect_to story_url(@story)
    else
      flash.now[:errors] = @story.errors.full_messages
      render :edit
    end
  end

  def destroy
    @story = Story.find(params[:id])
    @story.destory
    redirect_to stories_url
  end

  private
    def story_params
      params.require(:story)
        .permit(:title, :content)
    end

end
