class Api::CurrentUserController < ApplicationController
  
  def get_current_user
    if current_user
      render :get_current_user
    else
      render json: false
    end
  end
  
end