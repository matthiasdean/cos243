/*
    Ride Share ORM
    COS 243
    Daisy Bell & Matthias Dean
*/

const knex = require('knex') ({
    client: 'pg',
    connection: {
        host: 'faraday.cse.taylor.edu',
        user: 'daisy_bell',
        password: 'gakehere',
        database: 'daisy_bell'
    }
})

objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

module.exports = {knex, Model};

/*
knex.withSchema('ride_share')   
    .select('firstName')
    .from('User')
    .then(result => console.log(result))
    .then(() => knex.destroy());
*/