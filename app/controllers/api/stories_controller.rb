class Api::StoriesController < ApplicationController
  def index
    @stories = Story.all.includes(:user, :tags).order("created_at DESC")
    # change up how i serve stories later
    # the index feed will definitely include..
    # people they follow
    # tags they follow
    
    render :index
  end

  def create
    @title = "Fable | Share your tales with the world"
    binding.pry
    @story = Story.new(story_params)

    @story.user_id = current_user.id

    if @story.save
      render :show
    else
      render json: "Error"
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
    story = Story.find(params[:id])
    story.destroy
    
    render json: story
  end
  
  def get_comments_only
    story = Story.find(params[:id])
    @comments = story.get_comments_only
    
    render :get_comments
  end

  private
    def story_params
      params.require(:story)
        .permit(:title, :content, :banner_image)
    end

end