/*
	Ride Share ORM
	Location ORM Test
	COS 243
	Daisy Bell & Matthias Dean
*/

const Location = require("../models/Location.js");

Location.query()

    .catch(error => console.log(error.message))
    .then(() => knex.destroy());