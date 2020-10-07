/*
    Ride Share ORM
    Vehicle Model
    COS 243
    Daisy Bell & Matthias Dean
*/

const { knex, Model } = require("../db");

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }
    static get relationMappings() {
        return {
            authorizations: {
                relation: Model.HasManyRelation,
                modelClass: require("./Authorization"),
                join: {
                    from: 'Vehicle.vehicle_id',
                    to: 'Authorization.vehicle_id'
                }
            },
            rides: {
                relation: Model.HasManyRelation,
                modelClass: require("./Ride"),
                join: {
                    from: 'Vehicle.vehicle_id',
                    to: 'Ride.vehicle_id'
                }
            },
            vehicle_types: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Vehicle-Type"),
                join: {
                    from: 'Vehicle.vehicle_type_id',
                    to: 'Vehicle-Type.vehicle_type_id'
                }
            },
            states: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./State"),
                join: {
                    from: 'Vehicle.license_state',
                    to: 'State.abbreviation'
                }
            }
        };
    }
}