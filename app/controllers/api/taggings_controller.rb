class Api::TaggingsController < ApplicationController
  
  def create
    tag_ids = params[:tagging][:tag_ids]
    story_id = params[:tagging][:story_id]

    tag_ids.each do |id|
      Tagging.create(story_id: story_id, tag_id: id)
    end
    
    head :ok
  end
  
  def update
    story_id = params[:tagging][:story_id]
    current_tag_ids = Tagging.where(story_id: story_id).pluck(:tag_id)
    new_tag_ids = params[:tagging][:tag_ids]
    
    return if current_tag_ids == new_tag_ids
    
    # 1 - adding additional tagging
    if (new_tag_ids - current_tag_ids).length > 0
      additional_tag_ids = new_tag_ids - current_tag_ids
      additional_tag_ids.each { |id| Tagging.create(tag_id: id, story_id: story_id) }
    # 2 - delete an exisiting tagging
    elsif (current_tag_ids - new_tag_ids).length > 0
      removing_tag_ids = current_tag_ids - new_tag_ids
      removing_tag_ids.each { |id| Tagging.where(tag_id: id, story_id: story_id)[0].delete }
    end
    
    head :ok
  end
  
  private
    def tagging_params
      params.require(:tagging)
        .permit(:story_id, :tag_id)
    end
end