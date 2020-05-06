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
        <v-tooltip color="#ffffff" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
            id="orderTypeButton"
            color="primary"
            @click="setOneTimeOrder()"
            v-on="on">
              One-time order
            </v-btn>
          </template>
          <v-card width="250px">
            <v-card-text>An order that occurs only once.</v-card-text>
          </v-card>
        </v-tooltip>
        <v-tooltip color="#ffffff" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
            id="orderTypeButton"
            color="primary"
            @click="setRecurringOrder()"
            v-on="on">
              Recurring order
            </v-btn>
          </template>
          <v-card width="250px">
            <v-card-text>A repetitive order that occurs in your chosen interval.</v-card-text>
          </v-card>
        </v-tooltip>
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

#orderTypeButton {
  margin: 1%;
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