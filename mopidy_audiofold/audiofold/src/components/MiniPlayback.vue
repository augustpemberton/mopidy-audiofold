<template>
  <router-link 
    class="mini-playback"
    :to="{name: 'Playback'}"
    tag="div"
  >
    <div class="col-img">
      <img
        v-if="imgSrc"
        class="mini-playback-img"
        :src="imgSrc"
      >
    </div>
    <div 
      v-if="currentTrack"
      class="col-info"
    >
      <div class="info-track"> 
        {{ currentTrack.track.name.toLowerCase() }} 
      </div>
      <div class="info-artist"> 
        {{ currentTrack.track.artists[0].name.toLowerCase() }} 
      </div>
    </div>
    <div class="col-pause">
      <v-btn 
        v-if="playbackState == 'playing'"
        fab 
        @click.stop="pause"
      >
        <v-icon>
          mdi-pause
        </v-icon>
      </v-btn>
      <v-btn 
        v-else
        fab 
        @click.stop="play"
      >
        <v-icon>
          mdi-play
        </v-icon>
      </v-btn>
    </div>
  </router-link>
</template>

<script>
import queueControl from '@/mixins/queueControl'
import playbackControl from '@/mixins/playbackControl'
export default {
  mixins: [queueControl, playbackControl],
}
</script>

<style lang="scss" scoped>
  .mini-playback {
    background-color: $dark1;
    color: $white;
    width: 100vw;
    display: flex;
  }
  .col-img {
    flex: 10%;
  }
  .col-info{
    flex: 70%;
    padding: 10px 15px;
  }
  .col-pause {
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mini-playback-img {
    height: 10vh;
  }
  .info-track {
    width: 50vw;
    font-size: 1.3em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info-artist {
    font-size: 0.8em;
  }
</style>