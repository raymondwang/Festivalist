module SessionsHelper
  def current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end

  def authenticate!
    unless current_user
      redirect_to root_path
      # return false
    end
    # return true
  end
end
