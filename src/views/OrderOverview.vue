<template>
  <v-container>
    <NavBar/>
    <p>OrderOverview page</p>
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar/NavBar.vue';

export default {
  name: 'OrderOverview',
  components: {
    NavBar
  }
}
</script>
