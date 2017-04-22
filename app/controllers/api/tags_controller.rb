class Api::TagsController < ApplicationController
  
  def create
    @tag = Tag.new(tag_params)
    
    if @tag.save
      
    else
      render json: "Error"
    end
  end
  
  def search_tags
    search_term = params[:search_term]
    @tags = Tag.search_by_tag_desc(search_term)
    
    render :search_tags
  end
  
  def fetch_or_create
    tag_desc = params[:tag_desc]
    tag = Tag.where('lower(tag_desc) = lower(?)', tag_desc)[0]
    
    if tag.nil?
      tag = Tag.create(tag_desc: tag_desc)
    end
    
    render json: { id: tag.id, tag_desc: tag.tag_desc.capitalize }
  end
  
  private
    def tag_params
      params.require(:tag)
        .permit(:tag_desc)
    end
end