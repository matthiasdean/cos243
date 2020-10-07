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

class VehicleType extends Model {
    static get tableName() {
        return 'Vehicle-Type';
    }
    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: require("./Vehicle"),
                join: {
                    from: 'Vehicle-Type.vehicle_type_id',
                    to: 'Vehicle.vehicle_type_id'
                }
            }
        };
    }
}