class SessionsController < Devise::SessionsController
  prepend_before_action :allow_params_authentication!, only: :create
  prepend_before_action :verify_signed_out_user, only: :destroy
  prepend_before_action only: [:create, :destroy] { request.env["devise.skip_timeout"] = true }
  skip_before_action :verify_authenticity_token, only: [:destroy]
  
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?

    render json: { 
      authenticity_token: params[:authenticity_token],
      current_user: {
        id: current_user.id,
        fullname: current_user.fullname,
        username: current_user.username,
        user_image_url: current_user.photo.url
      }
    }
  end
  
  def destroy
    binding.pry
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    # respond_to_on_destroy
    
    render json: { authenticity_token: params[:authenticity_token] }
  end
end