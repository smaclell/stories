class CreateStarters < ActiveRecord::Migration
  def change
    create_table :starters do |t|
      t.belongs_to :paragraph, index: true
    end
  end
end
