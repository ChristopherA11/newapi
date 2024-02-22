class Mobile < ApplicationRecord
  
  validates :model, :brand, :price, :spec, presence: true

    
end



