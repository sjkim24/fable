class Api::BookmarksController < ApplicationController
  
  def index
    @bookmarks = Bookmark.where(user_id: params[:user_id])
    @user = User.find(params[:user_id])
    
    render :index
  end
  
  def create
    binding.pry
    story_id = params[:bookmark][:story_id]
    @bookmark = Bookmark.new(user_id: current_user.id, story_id: story_id)
    
    if @bookmark.save
      render json: @bookmark
    else
      render json: "Error"
    end
  end
  
  def destroy
    story_id = params[:bookmark][:story_id]
    @bookmark = Bookmark.where(user_id: current_user.id, story_id: story_id)[0]
    
    if @bookmark.destroy
      render json: @bookmark
    else
      render json: "Error"
    end
      
  end
  
  private
    def bookmark_params
      params.require(:bookmark)
        .permit(:user_id, :story_id)
    end
end