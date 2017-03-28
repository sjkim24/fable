class Api::CurrentUserController < ApplicationController
  def get_current_user
    @current_user = current_user
    render :get_current_user
  end
  
end