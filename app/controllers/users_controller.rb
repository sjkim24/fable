class UsersController < ApplicationController

  def create
    User.create(params[:user])
  end

  def new
    @user = User.new
  end

  private
    def users_params
      params.require(:person).permit(:username, :user_desc)
    end
end
