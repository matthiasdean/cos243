import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import Accounts from "./pages/Accounts.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import FindARide from "./pages/FindARide.vue";
import BecomeADriver from "./pages/BecomeADriver.vue";
import ViewRides from "./pages/ViewRides.vue";
import ProvideARide from "./pages/ProvideARide.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { name: "home-page", path: "/", component: Home },
    { name: "sign-up", path: "/sign-up", component: SignUp },
    { name: "sign-in", path: "/sign-in", component: SignIn },
    { name: "about-us", path: "/about-us", component: About },
    { name: "accounts", path: "/accounts", component: Accounts },
    { name: "reset-password", path: "/reset-password", component: ResetPassword },
    { name: "find-a-ride", path: "/find-a-ride", component: FindARide },
    { name: "become-a-driver", path: "/become-a-driver", component: BecomeADriver },
    { name: "view-rides", path: "/view-rides", component: ViewRides },
    { name: "provide-a-ride", path: "/provide-a-ride", component: ProvideARide },
  ]
});
