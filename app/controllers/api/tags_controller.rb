class Api::TagsController < ApplicationController
  
  def create
    @tag = Tag.new(tag_params)
  end
  
  def search_tags
    search_term = params[:search_term]
    @tags = Tag.search_by_tag_desc(search_term)
    
    render :search_tags
  end
  
  private
    def tag_params
      params.require(:tag)
        .permit(:tag_desc)
    end
end