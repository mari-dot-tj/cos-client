<template>
  <v-container>
    <NavBar/>
    <p>MyProfile page</p>
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar/NavBar.vue';

export default {
  name: 'MyProfile',
  components: {
    NavBar
  }
}
</script>