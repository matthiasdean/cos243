/*
    Ride Share ORM
    State Model
    COS 243
    Daisy Bell & Matthias Dean
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