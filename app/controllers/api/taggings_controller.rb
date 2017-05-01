class Api::TaggingsController < ApplicationController
  
  def create
    tag_ids = params[:tagging][:tag_ids]
    story_id = params[:tagging][:story_id]

    tag_ids.each do |id|
      Tagging.create(story_id: story_id, tag_id: id)
    end
    
    head :ok
  end
  
  def destroy
    
  end
  
  private
    def tagging_params
      params.require(:tagging)
        .permit(:story_id, :tag_id)
    end
end