class SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
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
      csrfParam: request_forgery_protection_token,
      csrfToken: form_authenticity_token,
      current_user: {
        id: current_user.id,
        fullname: current_user.fullname,
        username: current_user.username,
        user_image_url: current_user.photo.url
      }
    }
  end
  
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?

    render json: {
      csrfParam: request_forgery_protection_token,
      csrfToken: form_authenticity_token
    }
  end
  
  private

  # Check if there is no signed in user before doing the sign out.
  #
  # If there is no signed in user, it will set the flash message and redirect
  # to the after_sign_out path.
  def verify_signed_out_user
    if all_signed_out?
      set_flash_message! :notice, :already_signed_out

      respond_to_on_destroy
    end
  end

  def all_signed_out?
    users = Devise.mappings.keys.map { |s| warden.user(scope: s, run_callbacks: false) }

    users.all?(&:blank?)
  end
end