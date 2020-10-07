const { knex, Model } = require("../db.js");

class Driver extends Model {
    static get tableName() {
        return 'driver';
    }
    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
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