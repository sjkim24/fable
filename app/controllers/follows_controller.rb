class FollowsController < ApplicationController
  
  def create
    @follow = Follow.new(follow_params)
    
    if @follow.save
      redirect_to user_url()
    else
      
    end
  end
  
  def destroy
    
  end
  
  private
    def follow_params
      params.require(:follow)
        .permit(:follower_id, :following_id)
      end
    end
end