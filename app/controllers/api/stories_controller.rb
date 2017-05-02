class Api::StoriesController < ApplicationController
  def index
    # if current_user
    #   my_stories = current_user.stories
    #   followings_stories = current_user.followings
    #   
    #   tags = current_user.tag_follows.map do |tag_follow|
    #     tag_follow.tag
    #   end
    #   
    #   taggings = tags.map do |tag|
    #     next if Tagging.where(tag_id: tag.id).empty?
    #     Tagging.where(tag_id: tag.id)
    #   end
    #   GET UNIQUE TAGGINGS BASED story_id. NO NEED TO RETRIEVE 20 taggings with story_id 1
    #   
    #   binding.pry
    #   tag_follows_stories = taggings.map do |tagging|
    #     Story.find(tagging.story_id)
    #   end
    #   binding.pry
    # else
    #   @stories = Story.all.includes(:user, :tags).order("created_at DESC")
    # end
    @stories = Story.all.includes(:user, :tags).order("created_at DESC")
    # change up how i serve stories later
    # the index feed will definitely include..
    # people they follow
    # tags they follow
    
    # sql = "SELECT story_id, COALESCE(COUNT(*), 0) FROM story_likes WHERE story_id IN (15,13,12,11,10,9,8,7,6,5,4,3,2,1) GROUP BY story_id;"
    # likes = ActiveRecord::Base.connection.execute(sql)
    # self join story likes table so count of 0 values actually show up
    
    @top_liked_stories = Story.joins(:story_likes).group("stories.id").order("COUNT(stories.id) DESC").includes(:user).limit(3)
    @top_bookmarked_stories = Story.joins(:bookmarks).group("stories.id").order("COUNT(stories.id) DESC").includes(:user).limit(3)
    
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
    @comments = story.comments.includes(:comments, :user).where(parent_comment_id: nil)
    
    render :get_comments
  end

  private
    def story_params
      params.require(:story).permit(:title, :subtitle, :content, :banner_image)
    end

end