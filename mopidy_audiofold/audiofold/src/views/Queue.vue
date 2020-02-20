<template>
  <div class="queue">
    <v-container>
      <v-row 
        id="playback-min" 
      >
        <v-col>
          <div class="queue-container">
            <queue style="margin: 5vw 6.25vw; padding: 0px;" />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="mini-playback-wrapper">
      <mini-playback />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .mini-playback-wrapper {
    position: fixed;
    bottom: 0;
    z-index: 150;
    height: 10vh;
  }
  .queue-container {
    max-height: 90vh;
    overflow: hidden;
  }
  .queue {
    background-color: $light1;
  }
</style>