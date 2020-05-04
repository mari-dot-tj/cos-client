<template>
  <v-container>
    <NavBar/>
    <v-card 
    v-if="orderType==''"
    min-height="600px">
      <v-card-title class="justify-center">
        <h2 id="newOrderHeading">What type of order would you like to place?</h2>
      </v-card-title>
      <v-card-actions class="justify-center">
        <v-btn
        color="primary"
        @click="setOneTimeOrder()">
          One-time order
        </v-btn>
        <v-btn
        color="primary"
        @click="setRecurringOrder()">
          Recurring order
        </v-btn>
      </v-card-actions>
    </v-card>
    <NewOrderStepper
    v-if="orderType!=''"/>
  </v-container>
</template>

<style scoped>
#newOrderHeading {
  margin-top: 10%;
  color: #61706b;
}
</style>

<script>
import Vue from 'vue'
import NewOrderStepper from '../components/NewOrder/NewOrderStepper.vue'
import NavBar from '../components/NavBar/NavBar.vue'
import { mapGetters, mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'NewOrder',
  components: {
    NewOrderStepper,
    NavBar
  },
  methods: {
    setOneTimeOrder(){
      this.$store.dispatch('order/changeOrderType', 'oneTimeOrder')
    },
    setRecurringOrder(){
      this.$store.dispatch('order/changeOrderType', 'recurringOrder')    }
  },
  computed: {
    ...mapGetters('account', ['isLoggedIn']),
    ...mapState('order', ['orderType']),
    ...mapActions('order', ['changeOrderType'])
  },
  data: () => ({
  }),
  created(){
    if (!this.isLoggedIn) {
      this.$router.push('/login');
    }
  }
})
</script>