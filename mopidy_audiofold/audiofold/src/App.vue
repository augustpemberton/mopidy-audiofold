<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      connected: false,
    }
  },
  mounted: function(){
    var vue = this
    this.$mopidy.on("state:online", function () {
      vue.connected = true
    });
  },
}
</script>

<style lang="scss">
body {
  background-color: $color-bg;
  font-family: $font-family;
}
</style>