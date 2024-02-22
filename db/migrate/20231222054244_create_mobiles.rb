class CreateMobiles < ActiveRecord::Migration[7.1]
  def change
    create_table :mobiles do |t|
      t.string :model
      t.string :brand
      t.integer :price
      t.string :spec

      t.timestamps
    end
  end
end
