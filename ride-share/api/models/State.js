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

class State extends Model {
    static get tableName() {
        return 'State';
    }
    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: require("./Vehicle"),
                join: {
                    from: 'State.abbreviation',
                    to: 'Vehicle.license_state'
                }
            },
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: require("./Driver"),
                join: {
                    from: 'State.abbreviation',
                    to: 'Driver.licenseState'
                }
            },
            locations: {
                relation: Model.HasManyRelation,
                modelClass: require("./Location"),
                join: {
                    from: 'State.abbreviation',
                    to: 'Location.state'
                }
            }
        };
    }
}