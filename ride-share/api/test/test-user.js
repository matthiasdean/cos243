/*
	Ride Share ORM
    User ORM Test 
	COS 243
	Daisy Bell & Matthias Dean
*/

const User = require("../models/User.js");

User.query()

    .catch(error => console.log(error.message))
    .then(() => knex.destroy());
