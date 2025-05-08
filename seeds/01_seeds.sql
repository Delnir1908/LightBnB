INSERT INTO users (name, email, password)
VALUES ('John Smith', 'jsmith@hutmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Carlos Sanchez', 'csanchez@gemail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Signh Manpreet', 'smanpreet@yahu.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (1, 'downtown apartment', 'description1', 30000, 0, 1, 1, 'https://thumb-img.com/001.jpg', 'https://cover-img.com/001.jpg', 'Canada', '5th ave', 'Toronto', 'R7H 1K9'),
(2, 'suburb townhouse', 'description2', 25000, 2, 2, 3, 'https://thumb-img.com/002.jpg', 'https://cover-img.com/002.jpg', 'Canada', 'Granville st', 'Vancouver', 'V3H 2M8'),
(3, 'ranch house', 'description3', 40000, 4, 5, 8, 'https://thumb-img.com/003.jpg', 'https://cover-img.com/003.jpg', 'Canada', 'Rue Treaudu', 'Montreal', 'J7B 3E4');

INSERT INTO reservations (start_date, end_date, guest_id, property_id)
VALUES ('2025-05-01', '2025-05-06', 3, 1),
('2024-10-01', '2025-10-08', 1, 2),
('2025-03-14', '2025-03-20', 2, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 1, 4, 'message1'),
(1, 2, 2, 5, 'message2'),
(2, 3, 3, 4, 'message3');