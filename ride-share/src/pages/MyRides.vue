<template>
  <v-container>
    <div>
      <h4 class="display-1">My Rides</h4>

      <v-data-table
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="rides"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.distance }}</td>
            <td>{{ item.fuel_price }}</td>
            <td>{{ item.fee }}</td>
            <td>
              <v-icon small @click="deleteRide(item)">
                mdi-delete
              </v-icon>
              <v-icon v-if="isDriver" small @click="updateAccount(item)">
                mdi-steering
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

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isDriver() {
      return this.$store.getters.isDriver;
    },
  },

  name: "Rides",

  data: function() {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance", value: "distance" },
        { text: "Fuel Price", value: "fuel_price" },
        { text: "Fee", value: "fee" },
        { text: "Action", value: "action" }
      ],
      rides: [],

      snackbar: {
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get(`/rides/${this.$store.state.currentAccount.id}`)
    .then(response => {
      this.rides = response.data.map(ride => ({
        ride_id: ride.ride_id,
        date: ride.rides.date,
        time: ride.rides.time,
        distance: ride.rides.distance,
        fuel_price: ride.rides.fuel_price,
        fee: ride.rides.fee,
      }));
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
    },

    deleteRide(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      console.log("CURRENT ride ID: ", item.ride_id)
      this.$axios.post("/passenger", {
        passenger_id: this.$store.state.currentAccount.id,
        ride_id: item.ride_id,
      })
      this.showSnackbar("Ride removed.");
    },

    // Update account information.
    updateAccount(item) {
      console.log("UPDATE", JSON.stringify(item, null, 2));
      this.showSnackbar("Sorry, update is not yet implemented.");
    },

    // Delete an account.
    deleteAccount(item) {
      this.$axios.delete(`/accounts/${item.id}`).then(response => {
        if (response.data.ok) {
          // The delete operation worked on the server; delete the local account
          // by filtering the deleted account from the list of accounts.
          this.accounts = this.accounts.filter(
            account => account.id !== item.id
          );
        }
      });
    }
  }
};
</script>

<style>
.currentAccount {
  background: lightcoral;
}
</style>
