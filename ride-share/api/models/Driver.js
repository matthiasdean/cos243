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

class Driver extends Model {
    static get tableName() {
        return 'Driver';
    }
    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./User"),
                join: {
                    from: 'Driver.user_id',
                    to: 'User.user_id'
                }
            },
            authorizations: {
                relation: Model.HasManyRelation,
                modelClass: require("./Authorization"),
                join: {
                    from: 'Driver.driver_id',
                    to: 'Authorization.driver_id'
                }
            },
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: require("./Drivers"),
                join: {
                    from: 'Driver.driver_id',
                    to: 'Drivers.driver_id'
                }
            },
            states: {
                relation: Model.BelongsToOneRelation,
                modelClass: require("./State"),
                join: {
                    from: 'Driver.licenseState',
                    to: 'State.abbreviation'
                }
            }
        };
    }
}