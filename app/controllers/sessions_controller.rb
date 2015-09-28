class SessionsController < ApplicationController
  include SessionsHelper

  require 'rspotify'

  def create
    authenticate
    
    @spotify_user = RSpotify::User.new(request.env['omniauth.auth'])

    user = User.find_by(username: @spotify_user.id)

    if !user
      user = User.create(username: @spotify_user.id, location: locate)
    end

    session[:user_id] = user.id

    redirect_to playlists_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private

  def locate
    @location = request.remote_ip
    if @location == '::1' || @location == '127.0.0.1'
      @location = '72.229.28.185' # localhost
    end
  end

end
