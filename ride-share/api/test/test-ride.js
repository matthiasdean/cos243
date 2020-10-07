/*
	Ride Share ORM
    Ride ORM Test
	COS 243
	Daisy Bell & Matthias Dean
*/

const Ride = require("../models/Ride.js");

Ride.query()

    .catch(error => console.log(error.message))
    .then(() => knex.destroy());
