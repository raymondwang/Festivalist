module SessionsHelper
  def current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end

  def authenticate
    RSpotify.authenticate(ENV['SPOTIFY_KEY'], ENV['SPOTIFY_SECRET'])
  end
end
