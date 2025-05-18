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
/db
database.js
/migrations
/routes
app.js
README.md
```

## Credits

Project boilerplate and support from Lighthouse Labs.
