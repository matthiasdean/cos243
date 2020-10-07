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

class Location extends Model {
    static get tableName() {
        return 'Location';
    }
    static get relationMappings() {
        return {
            states: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./State"),
                join: {
                    from: 'Location.state',
                    to: 'State.abbreviation'
                }
            },
            from_rides: {
                relation: Model.HasManyRelation,
                modelClass: require("./Ride"),
                join: {
                    from: 'Location.location_id',
                    to: 'Ride.from_location_id'
                }
            },
            to_rides: {
                relation: Model.HasManyRelation,
                modelClass: require("./Ride"),
                join: {
                    from: 'Location.location_id',
                    to: 'Ride.to_location_id'
                }
            }
        };
    }
}