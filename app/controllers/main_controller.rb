class MainController < ApplicationController
  include SessionsHelper

  require 'rspotify'

  def index
  end

  def show
    unless current_user
      redirect_to root_path
    else
      @playlists = RSpotify::User.find(@current_user.username).playlists
    end
  end

  def events
    @playlist = RSpotify::Playlist.find(params[:owner_id], params[:id])

    locate
    artists = []
    @playlist.tracks.each do |track|
      artists << track.artists.first.name
    end

    @artists = artists.uniq
  end

  private

  def locate
    @ip_address = request.remote_ip
    if @ip_address == '::1' || @ip_address == '127.0.0.1'
      @ip_address = '108.35.31.49' # localhost
    end
  end

end
