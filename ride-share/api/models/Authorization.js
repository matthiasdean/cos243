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

class Authorization extends Model {
    static get tableName() {
        return 'Authorization';
    }
    static get relationMappings() {
        return {
            drivers: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Driver"),
                join: {
                    from: 'Authorization.driver_id',
                    to: 'Driver.driver_id'
                }
            },
            vehicles: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Vehicle"),
                join: {
                    from: 'Authorization.vehicle_id',
                    to: 'Vehicle.vehicle_id'
                }
            }
        };
    }
}