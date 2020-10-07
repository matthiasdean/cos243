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

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }
    static get relationMappings() {
        return {
            passengers: {
                relation: Model.HasManyRelation,
                modelClass: require("./Passenger"),
                join: {
                    from: 'Ride.ride_id',
                    to: 'Passenger.ride_id'
                }
            },
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: require("./Drivers"),
                join: {
                    from: 'Ride.ride_id',
                    to: 'Drivers.ride_id'
                }
            },
            vehicles: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Vehicle"),
                join: {
                    from: 'Ride.vehicle_id',
                    to: 'Vehicle.vehicle_id'
                }
            },
            from_locations: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Location"),
                join: {
                    from: 'Ride.from_location_id',
                    to: 'Location.location_id'
                }
            },
            to_locations: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./Location"),
                join: {
                    from: 'Ride.to_location_id',
                    to: 'Location.location_id'
                }
            }
        };
    }
}