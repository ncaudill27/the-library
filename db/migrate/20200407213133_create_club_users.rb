class CreateClubUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :club_users do |t|
      t.references :club, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :mod, null: false, default: true

      t.timestamps
    end
  end
end
