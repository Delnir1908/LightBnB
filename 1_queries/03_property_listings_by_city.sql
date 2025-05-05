SELECT properties.id AS id, title, cost_per_night, AVG(rating) AS average_rating from properties
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE properties.city LIKE '%ancouve%'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY average_rating
LIMIT 10;