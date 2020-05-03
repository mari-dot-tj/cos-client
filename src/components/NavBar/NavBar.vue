<template>
  <div>
    <v-app-bar
      app
      fixed
      light
      dense
      height= "80px"
      class="general"
    >
      <v-img src="../../assets/logo.png" max-height="100px" max-width="100px"/>
      <v-toolbar-items>
        <NavBarButton 
        v-for="item in navBarItems"
        :key="item.text"
        :text="item.text"
        :link="item.link"
        />
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="logout">
          <v-icon left>mdi-logout</v-icon>
          Log out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <Loader/>
  </div>
</template>

<style scoped>
.general {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>

<script>
import Vue from 'vue'
import NavBarButton from './NavBarButton.vue'
import customerService from '@/api/customer.api'
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/components/Loader'

export default Vue.extend({
    name: 'NavBar',
    components: {
      NavBarButton,
      Loader
    },
    data: () => ({
      activeItem: '',
      navBarItems: [
        {text: 'Order overview', link: '/order-overview'},
        {text: 'New order', link: '/new-order'},
        {text: 'My profile', link: '/my-profile'}
      ]
    }),
    computed: {
      ...mapGetters('account', ['isLoggedIn'])
    },
    methods: {
      ...mapActions('account', ['logout']),
      logout(){
        this.$store.dispatch('toggleLoader', true)
        customerService.logout()
          .then(response => {
            if(response!==undefined && response.status == 200){
              this.$store.dispatch('account/logout')
              this.$store.dispatch('toggleLoader', false)
              this.$router.push('/login')
            }
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch('toggleLoader', false)
          })
      },
    }
})
</script>