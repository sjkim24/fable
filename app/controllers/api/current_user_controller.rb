class Api::CurrentUserController < ApplicationController
  
  def get_current_user
    user_signed_in? ? (render :get_current_user) : (render json: false)
  end
  
end