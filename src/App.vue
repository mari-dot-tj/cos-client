<template>
  <v-app>
    <NavBar v-if="showNavBar()"/>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from './components/NavBar/NavBar.vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'App',

  components: {
    NavBar,
  },
  computed: {
    ...mapState('account', ['loggedIn'])
  },
  methods: {
    /* returns true if user is logged in and route is order-overview, new-order or my-profile */
    showNavBar(){
      if(this.loggedIn){
        if(this.$route.name == 'OrderOverview' || this.$route.name == 'NewOrder' || this.$route.name == 'MyProfile')
        return true
      }else return false
    }
  }
});
</script>
