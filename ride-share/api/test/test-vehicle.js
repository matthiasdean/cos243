/*
	Ride Share ORM
    Vehicle ORM Test
	COS 243
	Daisy Bell & Matthias Dean
*/

const Vehicle = require("../models/Vehicle.js");

Vechile.query()

    .catch(error => console.log(error.message))
    .then(() => knex.destroy());
