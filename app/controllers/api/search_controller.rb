class Api::SearchController < ApplicationController
  def search
    results = PgSearch.multisearch(params[:search_term])
    
    @stories = results.where(searchable_type: "Story").map do |story|
      Story.find(story.searchable_id)
    end
    
    @users = results.where(searchable_type: "User").map do |user|
      User.find(user.searchable_id)
    end
    
    @tags = results.where(searchable_type: "Tag")
    
    render :search_results
  end
end