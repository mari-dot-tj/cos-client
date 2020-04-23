<template>
  <v-container>
    <NavBar/>
    <NewOrderStepper/>
  </v-container>
</template>

<script>
import Vue from 'vue'
import NewOrderStepper from '../components/NewOrder/NewOrderStepper.vue'
import NavBar from '../components/NavBar/NavBar.vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'NewOrder',
  components: {
    NewOrderStepper,
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
})
</script>