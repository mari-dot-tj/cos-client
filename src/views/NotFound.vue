<template>
  <v-container class="general">
    <h1>404</h1>
    <h3>Ooops! Page not found.</h3>
    <p>Go to
        <router-link to="/login">login</router-link>
    </p>
  </v-container>
</template>

<style scoped>
.general{
    text-align: center;
}
</style>

<script>

export default {
  name: 'NotFound',
  
}
</script>