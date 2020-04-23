<template>
  <v-container>
    <NavBar/>
    <OrderOverviewTab/>
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar/NavBar.vue'
import OrderOverviewTab from '@/components/OrderOverview/OrderOverviewTab'
import { mapGetters } from 'vuex'
import { mount } from '@vue/test-utils'

export default {
  name: 'OrderOverview',
  components: {
    NavBar,
    OrderOverviewTab
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
