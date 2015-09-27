class CreateUsers < ActiveRecord::Migration
  def change
    enable_extension 'hstore'
    create_table :users do |t|
      t.string :username, null: false
      t.string :ip_address
      t.hstore :spotify_hash, null: false
      t.timestamps null: false
    end
  end
end
