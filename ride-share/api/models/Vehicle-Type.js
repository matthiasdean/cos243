/*
    Ride Share ORM
    Vehicle Type Model
    COS 243
    Daisy Bell & Matthias Dean
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

module.exports = VehicleType;