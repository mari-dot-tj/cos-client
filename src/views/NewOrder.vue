<template>
  <v-container>
    <NavBar/>
    <NewOrderStepper/>
  </v-container>
</template>

<script>
import Vue from 'vue'
import NewOrderStepper from '../components/NewOrder/NewOrderStepper.vue'
import NavBar from '../components/NavBar/NavBar.vue';

export default Vue.extend({
  name: 'NewOrder',
  components: {
    NewOrderStepper,
    NavBar
  }
})
</script>