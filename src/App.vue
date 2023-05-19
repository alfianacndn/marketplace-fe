<template>
  <v-app>
    <v-main>
    <Navbar v-if="showNavbar"  />

    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/NavBar.vue";

export default {
  name: 'App',
  components: {Navbar},
  data(){
    return {
      showNavbar:false
    }
  },
  mounted() {
    if (this.$route.name == 'Login' || this.$route.name == 'Register'){
      this.showNavbar = false
    } else {
      this.showNavbar = true
    }
  },
};
</script>
