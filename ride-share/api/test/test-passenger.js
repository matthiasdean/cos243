/*
	Ride Share ORM
    Ride ORM Test
	COS 243
	Daisy Bell & Matthias Dean
*/

const { knex, Model } = require("../db");
const Ride = require("../models/Passenger.js");

Ride.query().withSchema('ride_share')
    .select('ride_id')
    .withGraphFetched('rides')
    .then(ride => console.log(ride))
    .catch(error => console.log(error.message))
    .then(() => knex.destroy());