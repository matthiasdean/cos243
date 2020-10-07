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

const { knex, Model } = require("../db");

class Drivers extends Model {
    static get tableName() {
        return 'Drivers';
    }
    static get relationMappings() {
        return {
            driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Driver"),
                join: {
                    from: 'Drivers.driver_id',
                    to: 'Driver.driver_id'
                }
            },
            rides: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Ride"),
                join: {
                    from: 'Drivers.ride_id',
                    to: 'Ride.ride_id'
                }
            }
        };
    }
}