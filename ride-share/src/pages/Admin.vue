<template>
  <v-container>
    <div>
      <h4 class="display-2">Admin</h4><br><br>

      <!-- Rides Table -->
      <h6 class="display-1">Rides            <v-btn color="primary" text @click="addNewRide()">
        Add a Ride
      </v-btn></h6>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-data-table
        class="elevation-1"
        v-bind:headers="ride_headers"
        v-bind:items="rides"
        v-bind:search="search"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.to_name }}</td>
            <td>{{ item.from_name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.zip_code }}</td>
            <td>
              <v-icon small class="ml-2" @click="viewRide(item)">
                mdi-eye
              </v-icon>
              <v-icon small class="ml-2" @click="deleteRide(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="modifyRide(item)">
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table> <br> <br>

      <!-- Vehicle Table -->
      <h6 class="display-1">Vehicles            <v-btn color="primary" text @click="addNewVehicle()">
        Add a Vehicle
      </v-btn></h6>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-data-table
        class="elevation-1"
        v-bind:headers="vehicle_headers"
        v-bind:items="vehicles"
        v-bind:search="search"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.make }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.capacity }}</td>
            <td>{{ item.mpg }}</td>
            <td>{{ item.licence_state }}</td>
            <td>{{ item.licence_plate }}</td>
            <td>
              <v-icon small class="ml-2" @click="viewRide(item)">
                mdi-eye
              </v-icon>
              <v-icon small class="ml-2" @click="deleteRide(item)">
                mdi-delete
              </v-icon>
              <v-icon small class="ml-2" @click="modifyRide(item)">
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  ride_name: "Rides",
  vehicle_name: "Vehicles",

  data: function() {
    return {
      search: "",
      ride_headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "To Location", value: "to_name" },
        { text: "From Location", value: "from_name" },
        { text: "Address", value: "address" },
        { text: "City", value: "city" },
        { text: "State", value: "state" },
        { text: "ZIP", value: "zip_code" },
        { text: "Action", value: "action" },
      ],
      vehicle_headers: [
        { text: "Make", value: "make" },
        { text: "Model", value: "model" },
        { text: "Color", value: "color" },
        { text: "Capacity", value: "capacity" },
        { text: "MPG", value: "mpg" },
        { text: "License State", value: "licence_state" },
        { text: "License Plate", value: "licence_plate" },
        { text: "Action", value: "action" },
      ],
      rides: [],
      vehicles: [],

      snackbar: {
        show: false,
        text: "",
      },
    };
  },

  mounted: function() {
    this.$axios.get("/rides").then((response) => {
      console.log("RESPONSE", response);
      this.rides = response.data.map((ride) =>
        //console.log(ride.to_locations.zip_code),
        (
          console.log("RIDE", ride),
          {
          ride_id: ride.ride_id,
          date: ride.date,
          time: ride.time,
          to_name: ride.to_locations.name,
          from_name: ride.from_locations.name,
          address: ride.to_locations.address,
          city: ride.to_locations.city,
          state: ride.to_locations.state,
          zip_code: ride.to_locations.zip_code,
        })
      );
    }),

    this.$axios.get("/vehicles").then((response) => {
      console.log("RESPONSE", response);
      this.vehicles = response.data.map((vehicle) =>
        //console.log(ride.to_locations.zip_code),
        (
          console.log("VEHICLE", vehicle),
          {
          vehicle_id: vehicle.vehicle_id,
          make: vehicle.make,
          model: vehicle.model,
          color: vehicle.color,
          capacity: vehicle.capacity,
          mpg: vehicle.mpg,
          licence_state: vehicle.licence_state,
          licence_plate: vehicle.licence_plate,
        })
      );
    });
    },

  methods: {
    // Display a snackbar message.
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },

    // Calculate the CSS class for an item
    itemClass(item) {
      const currentAccount = this.$store.state.currentAccount;
      if (currentAccount && currentAccount.id === item.id) {
        return "currentAccount";
      }
      return currentAccount;
    },

    // RIDE FUNCTIONS
      // Remove a ride listing
      deleteRide(item) {
        console.log("UPDATE", JSON.stringify(item, null, 2));
        console.log("CURRENT ride ID: ", item.ride_id);
        this.$axios.delete(`/ride/${item.ride_id}`);
        this.rides = this.rides.filter((ride) => ride.ride_id !== item.ride_id);
        this.showSnackbar("Ride removed.");
      },

      // View ride information.
      viewRide(item) {
        console.log("UPDATE", JSON.stringify(item, null, 2));
        this.showSnackbar("Sorry, feature is not yet implemented.");
      },

      // ride information.
      addNewRide() {
        this.showSnackbar("Sorry, feature is not yet implemented.");
      },

      // Modify ride information.
      modifyRide(item) {
        console.log("UPDATE", JSON.stringify(item, null, 2));
        this.showSnackbar("Sorry, feature is not yet implemented.");
      },

    // VEHICLE FUNCTIONS
      // Remove a ride listing
      deleteVehicle(item) {
        console.log("UPDATE", JSON.stringify(item, null, 2));
        console.log("CURRENT ride ID: ", item.ride_id);
        this.$axios.delete(`/ride/${item.ride_id}`);
        this.rides = this.rides.filter((ride) => ride.ride_id !== item.ride_id);
        this.showSnackbar("Ride removed.");
      },

      // View ride information.
      viewVehicle(item) {
        console.log("UPDATE", JSON.stringify(item, null, 2));
        this.showSnackbar("Sorry, feature is not yet implemented.");
      },

      // ride information.
      addNewVehicle() {
        this.showSnackbar("Sorry, feature is not yet implemented.");
      },

      // Modify ride information.
      modifyVehicle(item) {
        console.log("UPDATE", JSON.stringify(item, null, 2));
        this.showSnackbar("Sorry, feature is not yet implemented.");
      },

    // Update account information.
    updateAccount(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete an account.
    deleteAccount(item) {
      this.$axios.delete(`/accounts/${item.id}`).then((response) => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local account
          // by filtering the deleted account from the list of accounts.
          this.rides = this.rides.filter((ride) => ride.id !== item.id);
        }
      });
    },
  },
};
</script>

<style>
.currentAccount {
  background: lightcoral;
}
</style>
