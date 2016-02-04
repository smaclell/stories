class Paragraph < ActiveRecord::Base
  validates :text, presence: true
  has_ancestry
end
