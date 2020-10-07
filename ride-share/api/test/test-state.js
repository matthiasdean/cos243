/*
	Ride Share ORM
    State ORM Test
	COS 243
	Daisy Bell & Matthias Dean
*/

const State = require("../models/State.js");

State.query()

    .catch(error => console.log(error.message))
    .then(() => knex.destroy());
