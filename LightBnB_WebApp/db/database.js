const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "jasonchen",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

//test code for checking connection
// the following assumes that you named your connection variable `pool`
// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
*/
const getUserWithEmail = function (email) {
  /*
  let resolvedUser = null;
  for (const userId in users) {
    const user = users[userId];
    if (user && user.email.toLowerCase() === email.toLowerCase()) {
      resolvedUser = user;
      }
      }
      return Promise.resolve(resolvedUser);
      */
     
  return pool
  .query(
    `SELECT * FROM users WHERE email =  $1`, [email.toLowerCase()])
    .then((result) => {
      //if not user found, the result rows array should have no element, hence .length should === 0
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
          
};
      
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
*/
const getUserWithId = function (id) {
  /*
  return Promise.resolve(users[id]);
  */
  
  return pool
  .query(
    `SELECT * FROM users WHERE id =  $1`, [id])
    .then((result) => {
      //if not user found, the result rows array should have no element, hence .length should === 0
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    throw err;
  });

};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  /*
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user);
  */
  return pool
  .query(
    `INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    throw err;
  });
  



};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  /*
  return getAllProperties(null, 2);
  */
  return pool
  .query(
    `SELECT reservations.*, properties.*
    FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY start_date
    LIMIT $2;`, [guest_id, limit])
  .then((result) => {
    //test out result
    // console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
    throw err;
  });

};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  //Setup an array to hold any parameters that may be available for the query
  const queryParams = [];
  //Setup an array to hold any options qurey string that may be available for the query string
  const optionsArray = [];

  //Start the query with all information that comes before the WHERE clause
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  //Check if a city has been passed in as an option. Add the city to the optionsArray and create a clause for the city
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    optionsArray.push(`city LIKE $${queryParams.length}`);
  }
  
  //Check if a owner_id has been passed in as an option. Add the owner_id to the optionsArray and create a clause for the owner_id
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    optionsArray.push(`owner_id = $${queryParams.length}`);
  }
  
  //Check if a minimum_price_per_night has been passed in as an option. Add the minimum_price_per_night to the optionsArray and create a clause for the minimum_price_per_night
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    //minimum_price_per_night is multiplied by 100 to convert dollars to cents
    optionsArray.push(`cost_per_night >= $${queryParams.length} `);
  }
  
  //Check if a maximum_price_per_night has been passed in as an option. Add the maximum_price_per_night to the optionsArray and create a clause for the maximum_price_per_night
  if (options.maximum_price_per_night) {
    //maximum_price_per_night is multiplied by 100 to convert dollars to cents
    queryParams.push(options.maximum_price_per_night * 100);
    optionsArray.push(`cost_per_night <= $${queryParams.length} `);
  }
  
  //add all options to queryString with 'WHERE' and join with ' AND '
  if (optionsArray.length > 0) {
    queryString += " WHERE " + optionsArray.join(" AND ");
  }
  
  queryString += ` GROUP BY properties.id`

  //Check if a minimum_rating has been passed in as an option. Add the minimum_rating to the optionsArray and create a clause for the minimum_rating
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += (` HAVING AVG(property_reviews.rating) >= $${queryParams.length}`);
  }
  
  //add LIMIT as the last query item
  queryParams.push(limit);
  queryString += `
     ORDER BY cost_per_night
     LIMIT $${queryParams.length};
    `;

  // test out parameters
  //console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      //test out result
      //console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });

};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  /*
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
  */

  //set queryString to include all property features to be added
  const queryString = `
  INSERT INTO properties (
  owner_id, 
  title, 
  description, 
  thumbnail_photo_url, 
  cover_photo_url, 
  cost_per_night, 
  street, 
  city, 
  province, 
  post_code, 
  country, 
  parking_spaces, 
  number_of_bathrooms, 
  number_of_bedrooms) 
  VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  //set property values into queryParams
  const queryParams = [
  property.owner_id, 
  property.title, 
  property.description, 
  property.thumbnail_photo_url, 
  property.cover_photo_url, 
  property.cost_per_night, 
  property.street, 
  property.city, 
  property.province, 
  property.post_code, 
  property.country, 
  property.parking_spaces, 
  property.number_of_bathrooms, 
  property.number_of_bedrooms
  ];

  return pool
    .query(queryString, queryParams)
      .then((result) => {
        return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });


};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
