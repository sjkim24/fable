class TagsController < ApplicationController
  
  def create
    @tag = Tag.new(tag_params)
    
    # if @tag.save
    #   redirect_to 
  end
  
  def destroy
    
  end
  
  private
    def tag_params
      params.require(:tag)
        .permit(:tag_desc)
    end
end