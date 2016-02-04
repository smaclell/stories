# TODO: Add real starters which can have extra fields and fun
class Starter < ActiveRecord::Base
  has_one :paragraph
end
