class AddParagraphsAncestry < ActiveRecord::Migration
  def change
    add_column :paragraphs, :ancestry, :string
    add_index :paragraphs, :ancestry
  end
end
