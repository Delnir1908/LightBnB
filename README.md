# LightBnB

LightBnB is a simple multi-page Airbnb clone utilizing Node.js and PostgreSQL. LightBnB lets users search for, book, and review vacation properties.

## Features

- User registration and login
- Search and filter properties by city, price, and rating
- Book reservations and view your bookings
- Leave and view property reviews

## Tech Stack

- Node.js, Express
- PostgreSQL (`pg` library)
- JavaScript

## Setup

1. **Clone the repo**
    ```
    git clone https://github.com/yourusername/lightbnb.git
    cd lightbnb
    ```

2. **Install dependencies**
    ```
    npm install
    ```

3. **Set up the database**
    - Make sure PostgreSQL is running.
    - Create the database and run migrations/seeds:
      ```
      createdb lightbnb
      psql -d lightbnb -f migrations/schema.sql
      psql -d lightbnb -f migrations/seeds/seed.sql
      ```

4. **Start the app**
    ```
    npm start
    ```
    Visit [http://localhost:3000](http://localhost:3000)

## Project Structure
```
├── 1_queries/ # Sample SQL queries
├── LightBnB_WebApp/ # Main application source code
│ ├── db/ # Database interaction code and sample data
│ ├── public/ # HTML, CSS, and client-side JavaScript
│ ├── routes/ # Express route handlers
│ ├── styles/ # Sass stylesheets
│ ├── server.js # Main server file
│ ├── package.json # App dependencies
│ └── README.md # App documentation
├── migrations/ # Database schema and migration files
├── seeds/ # Database seed data
├── README.md # Project documentation (this file)
```

## Credits

Project boilerplate and support from Lighthouse Labs.
