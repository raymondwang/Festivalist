require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, ENV['SPOTIFY_KEY'], ENV['SPOTIFY_SECRET'], scope: 'playlist-read-private playlist-read-collaborative'
end
