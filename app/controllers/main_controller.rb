class MainController < ApplicationController
  include SessionsHelper

  require 'rspotify'

  before_action :authenticate

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
    current_user
    @playlist = RSpotify::Playlist.find(params[:owner_id], params[:id])

    artists = []
    @playlist.tracks.each do |track|
      artists << track.artists.first.name
    end

    @artists = artists.uniq
  end

  def change_location
    if current_user
      @current_user.update(location: params[:location])
    end

    respond_to do |format|
      format.text { head :no_content }
    end
  end

  private

  def location_params

  end

end
