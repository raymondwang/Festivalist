class SessionsController < ApplicationController
  include SessionsHelper

  require 'rspotify'
  require 'bandsintown'

  def create
    @spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    spotify_hash = @spotify_user.to_hash

    user = User.find_by(username: spotify_hash['id'])
    if user
      user.update(spotify_hash: spotify_hash)
    else
      user = User.create(username: spotify_hash['id'], ip_address: locate, spotify_hash: spotify_hash)
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
    @ip_address = request.remote_ip
    if @ip_address == '::1' || @ip_address == '127.0.0.1'
      @ip_address = '108.35.31.49' # temporary, just for testing during development
    end
  end

end
