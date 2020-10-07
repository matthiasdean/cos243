const { knex, Model } = require("../db.js");

class User extends Model {
    static get tableName() {
        return 'User';
    }
    static get relationMappings() {
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'User.user_id',
                    to: 'Driver.user_id'
                }
            },
            passengers: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'User.user_id',
                    to: 'Passenger.passenger_id'
                }

            }
        };

    }
}

/*
User.query().withSchema('ride_share')
    .select('user_id')
    .withGraphFetched('Driver') 
    .then(user => console.log(result))
    .catch(error => console.log(error.message))
    .then(() => knex.destroy());
*/