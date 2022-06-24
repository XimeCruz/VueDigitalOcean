<template>
  <v-app>
    <v-app-bar
      app      
      color="white"
      dark
      elevation="0"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo_main.svg"
          transition="scale-transition"
          width="40"
        />
        <v-app-bar-title class="primary--text"
        >SuperTicket</v-app-bar-title>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
<style>
  html { overflow-y: auto !important }
</style>