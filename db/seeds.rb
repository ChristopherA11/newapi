# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Mobile.create([
    {
        model:"s23",
        brand:"Samsung",
        price:89999,
        spec:"best processor"
    },
    {
        model:"15 Max",
        brand:"Apple",
        price:85999,
        spec:"best premium"
    },
    {
        model:"11 R",
        brand:"Oneplus",
        price:559999,
        spec:"best camera"
    },

])
