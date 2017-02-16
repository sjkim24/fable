class TaggingsController < ApplicationController
  
  def create
    
  end
  
  def destroy
    
  end
  
  private
    def tagging_params
      params.require(:tagging)
        .permit(:story_id, :tag_id)
    end
end