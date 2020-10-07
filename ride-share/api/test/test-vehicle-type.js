/*
	Ride Share ORM
    Vehicle Type ORM Test
	COS 243
	Daisy Bell & Matthias Dean
*/

const VehicleType = require("../models/Vehicle-Type.js");

VehicleType.query()

    .catch(error => console.log(error.message))
    .then(() => knex.destroy());
