SELECT city, COUNT(*) AS total_reservations FROM reservations
JOIN properties ON properties.id = property_id
GROUP BY city
ORDER BY COUNT(*) DESC;