class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  private
    def users_params
      params.require(:person).permit(:username, :user_desc)
    end
end