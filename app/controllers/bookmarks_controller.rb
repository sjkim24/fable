class BookmarksController < ApplicationController
  
  def index
    @bookmarks = Bookmark.where(user_id: params[:user_id])
    @user = User.find(params[:user_id])
    
    render :index
  end
  
  def create
    @bookmark = Bookmark.new(user_id: current_user.id, story_id: params[:story_id])
    
    if @bookmark.save!
      redirect_to story_url(params[:story_id])
    else
      flash.now[:errors] = @bookmark.errors.full_messages
    end
  end
  
  def destroy
    @bookmark = Bookmark.find(params[:id])
    @story_id = @bookmark.story_id
    
    if @bookmark.destroy
      redirect_to story_url(@story_id)
    else
      flash.now[:errors] = @bookmark.errors.full_messages
    end
      
  end
  
  def unbookmark
    @bookmark = Bookmark.find(params[:id])
    @story_id = @bookmark.story_id
    
    if @bookmark.destroy
      redirect_to story_url(@story_id)
    else
      flash.now[:errors] = @bookmark.errors.full_messages
    end
  end
  
  private
    def bookmark_params
      params.require(:bookmark)
        .permit(:user_id, :story_id)
    end
end