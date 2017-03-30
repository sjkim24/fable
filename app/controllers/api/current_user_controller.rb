class Api::CurrentUserController < ApplicationController
  
  def get_current_user
    render json: { 
      id: current_user.id,
      fullname: current_user.fullname,
      username: current_user.username,
      image_url: current_user.photo.url
    }
  end
  
end