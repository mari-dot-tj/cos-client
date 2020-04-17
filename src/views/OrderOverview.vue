<template>
  <v-container>
    <NavBar/>
    <p>OrderOverview page</p>
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar/NavBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderOverview',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters('account', ['isLoggedIn'])
  },
  created(){
    if (!this.isLoggedIn) {
      this.$router.push('/login');
    }
  }
}
</script>
