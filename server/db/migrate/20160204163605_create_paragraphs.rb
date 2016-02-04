class CreateParagraphs < ActiveRecord::Migration
  def change
    create_table :paragraphs do |t|
      t.string :text, limit: 140
      t.string :path
    end
  end
end
