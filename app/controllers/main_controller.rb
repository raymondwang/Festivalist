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

    artists = []
    @playlist.tracks.each do |track|
      artists << track.artists.first.name
    end

    @artists = artists.uniq

    current_user
  end

  private

  def getArtists

  end

end
