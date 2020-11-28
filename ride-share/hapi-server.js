// Knex
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "faraday.cse.taylor.edu", // PostgreSQL server
    user: "daisy_bell", // Your user name
    password: "kohifaga", // Your password
    database: "daisy_bell", // Your database name
  },
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
//const Account = require("./models/Account");
const Ride = require("./api/models/Ride");
const User = require("./api/models/User");
const Driver = require("./api/models/Driver");
const Passenger = require("./api/models/Passenger");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: true,
  },
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  // Configure routes.
  server.route([
    {
      method: "POST",
      path: "/accounts",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingAccount = await User.query()
          .where("email", request.payload.email)
          .first();
        if (existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' is already in use`,
          };
        }

        const newAccount = await User.query().insert({
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
          phone: "765-555-1212" // THIS SHOULD BE ANOTHER FORM FIELD
        });

        if (newAccount) {
          return {
            ok: true,
            msge: `Created account '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create account with email '${request.payload.email}'`,
          };
        }
      },
    },

    {
      method: "GET",
      path: "/ride",
      config: {
        description: "Retrieve all rides",
      },
      handler: (request, h) => {
        return Ride.query()
          .withSchema("ride_share")
          .select("date", "time")
          .withGraphFetched("to_locations")
          .withGraphFetched("from_locations");
      },
    },

    {
      method: "DELETE",
      path: "/accounts/{id}",
      config: {
        description: "Delete an account",
      },
      handler: (request, h) => {
        return Account.query()
          .deleteById(request.params.id)
          .then((rowsDeleted) => {
            if (rowsDeleted === 1) {
              return {
                ok: true,
                msge: `Deleted account with ID '${request.params.id}'`,
              };
            } else {
              return {
                ok: false,
                msge: `Couldn't delete account with ID '${request.params.id}'`,
              };
            }
          });
      },
    },

    {
      method: "POST",
      path: "/login",
      config: {
        description: "Log in",
      },
      handler: async (request, h) => {
        const user = await User.query()
          .withSchema("ride_share")
          .where("email", request.payload.email)
          .first();
        if (user) {
          return {
            ok: true,
            msge: `Logged in successfully as '${request.payload.email}'`,
            details: {
              id: user.user_id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              isAdmin: user.isAdmin,
            },
          };
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },

    {
      method: "POST",
      path: "/driver",
      config: {
        description: "Drivers in system",
      },
      handler: async (request, h) => {
        const driver = await Driver.query()
          .withSchema("ride_share")
          .where("user_id", request.payload.user_id)
          .first();
        if (driver) {
          return {
            ok: true,
            msge: `User with user id '${request.payload.user_id}' is a driver.`,
            details: {
              driver_id: driver.driver_id,
              user_id: driver.user_id,
              licenseNumber: driver.licenseNumber,
              licenseState: driver.LicenseState,
            },
          };
        } else {
          return {
            ok: false,
            msge: "User is not a driver",
          };
        }
      },
    },

    {
      method: "POST",
      path: "/rides",
      config: {
        description: "Find a user's rides",
      },
      handler: (request, h) => {
        if (request.payload.signup) {
          //Passenger.query()
          knex("passenger")
            .withSchema('ride_share')
            .insert({passenger_id: request.payload.passenger_id, ride_id: request.payload.ride_id});
          //return {
          //  msge: "Added to Ride",
          //}
        } else {
          return Passenger.query()
            .withSchema('ride_share')
            .select('ride_id')
            .withGraphFetched('rides')
            .where("passenger_id", request.payload.passenger_id);
        }
      },
    },

    {
      method: "DELETE",
      path: "/rides",
      config: {
        description: "Remove a user from a ride.",
      },
      handler: (request, h) => {
        Passenger.query()
          .withSchema('ride_share')
          //.deleteById(request.payload.passenger_id, reques.payload.ride_id);
          .where("passenger_id", request.payload.passenger_id)
          .andWhere("ride_id", request.payload.ride_id)
          .del();
        return {
          msge: "Removed User from Ride."
        }
      },
    },

    {
      method: "POST",
      path: "/become-driver",
      config: {
        description: "Set user as driver",
      },
      handler: async (request, h) => {
        const driver = await Driver.query().withSchema('ride_share')
          .where("user_id", request.payload.user_id)
          .first();
        if (driver) {
          return {
            ok: true,
            msge: `User with user id '${request.payload.user_id}' is a driver.`,
            details: {
              driver_id: driver.driver_id,
              user_id: driver.user_id,
              licenseNumber: driver.licenseNumber,
              licenseState: driver.LicenseState,
            },
          };
        } else {
          return {
            ok: false,
            msge: "User is not a driver",
          };
        }
      },
    },
  ]);

  // Start the server.
  await server.start();
}

process.on("unhandledRejection", (err) => {
  server.logger().error(err);
  process.exit(1);
});

// Go!
init();
