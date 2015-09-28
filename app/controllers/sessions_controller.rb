class SessionsController < ApplicationController
  include SessionsHelper

  require 'rspotify'

  def create
    RSpotify.authenticate(ENV['SPOTIFY_KEY'], ENV['SPOTIFY_SECRET'])

    @spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    spotify_hash = @spotify_user.to_hash

    user = User.find_by(username: spotify_hash['id'])
    if user
      user.update(spotify_hash: spotify_hash)
    else
      user = User.create(username: spotify_hash['id'], spotify_hash: spotify_hash)
    end

    session[:user_id] = user.id

    redirect_to playlists_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end
