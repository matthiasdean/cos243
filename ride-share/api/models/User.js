/*
    Ride Share ORM
    COS 243
    Daisy Bell & Matthias Dean
*/

/*
RELATION        ATTRIBUTE               FK(S) IN
---------------------------------------------------
One-to-Many     BelongsToOneRelation    Source
                HasManyRelation         Related

Many-to-Many    ManyToManyRelation      Join table

One-to-One      BelongsToOneRelation    Source
                HasOneRelation          Related
                HasOneThroughRelation   Join table
*/

const { knex, Model } = require("../db.js");

class Driver extends Model {
    static get tableName() {
        return 'Driver';
    }
}

class Passenger extends Model {
    static get tableName() {
        return 'Passenger';
    }
}

class User extends Model {
    static get tableName() {
        return 'User';
    }
    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'User.user_id',
                    to: 'Driver.user_id'
                }
            },
            passengers: {
                relation: Model.HasManyRelation,
                modelClass: Passenger,
                join: {
                    from: 'User.user_id',
                    to: 'Passenger.passenger_id'
                }

            }
        };
    }
}

User.query().withSchema('ride_share')
    .select('user_id')
    .withGraphFetched('drivers')
    .then(user => console.log(user))
    .catch(error => console.log(error.message))
    .then(() => knex.destroy());