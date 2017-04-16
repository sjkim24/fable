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

  def show
    @story = Story.find(params[:id])
        
    render :show
  end

  def update
    @story = Story.find(params[:id])
    if @story.update_attributes(story_params)
      render :show
    else
      render "Error"
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
      params.require(:story).permit(:title, :subtitle, :content, :banner_image)
    end

end