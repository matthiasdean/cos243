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
        return 'driver';
    }
    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Drivers,
                join: {
                    from: 'Driver.driver_id',
                    to: 'Drivers.driver_id'
                }
            },
            authorizations: {
                relation: Model.HasManyRelation,
                modelClass: Authorization,
                join: {
                    from: 'Driver.driver_id',
                    to: 'Authorization.driver_id'
                }
            }
        };
    }
}