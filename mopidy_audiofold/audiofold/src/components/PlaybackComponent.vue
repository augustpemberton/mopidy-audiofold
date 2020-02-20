<template>
  <div class="playback-wrapper">
    <div class="playback-nav">
      <v-btn 
        id="queueBtn"
        class="navBtn"
        :to="{name: 'Queue'}"
        tile
      >
        Q
      </v-btn>
      <v-btn 
        id="searchBtn"
        class="navBtn"
        tile
        :to="{name: 'Search'}"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <div class="playback-view">
      <div class="img-wrapper wraptocenter">
        <v-img
          v-if="imgSrc"
          id="album-art"
          :src="imgSrc"
          height="66vw"
          contain
        />
      </div>
    </div>  
    <div class="playback-control">
      <div 
        v-if="currentTrack"
        class="track-info"
      >
        <div class="info-track"> 
          {{ currentTrack.track.name.toLowerCase() }} 
        </div>
        <div class="info-artist"> 
          {{ currentTrack.track.artists[0].name.toLowerCase() }} 
        </div>
      </div>
      <div class="track-progress"> 
        <v-slider 
          v-if="currentTrack"
          :value="$store.getters.playbackPosition"
          min="0"
          :max="currentTrack.track.length"
          color="white"
          track-color="black"
          always-dirty
          @change="seek"
        >
          <template v-slot:prepend>
            <span class="v-center">
              {{ minutes($store.getters.playbackPosition) }}:{{ seconds($store.getters.playbackPosition) }}
            </span>
          </template>

          <template v-slot:append>
            <span 
              v-if="currentTrack"
              class="v-center"
            >
              {{ minutes(currentTrack.track.length) }}:{{ seconds(currentTrack.track.length) }}
            </span>
          </template>
        </v-slider>
      </div>
      <div class="track-controls">
        <div class="control-prev-spacer" />
        <!-- back -->
        <div class="control-prev">
          <v-btn
            id="prev-btn"
            fab
            @click="prev"
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
        </div>
        <!-- pause/play -->
        <div class="control-pause">
          <v-btn
            v-if="playbackState == 'playing'"
            id="pause-btn"
            fab
            @click="pause"
          >
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn
            v-else
            id="pause-btn"
            fab
            @click="play"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </div>
        <!-- next -->
        <div class="control-next">
          <v-btn
            id="next-btn"
            fab
            @click="next"
          >
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </div>
        <div class="control-next-spacer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .playback-nav {
    background-color: $light1;
    height: 10vh;
  }
  .playback-view {
    background-color: $light1;
    height: 56vh;
  }
  .playback-control {
    background-color: $dark1;
    height: 34vh;
  }
  .wraptocenter {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 100vw;
    height: 100vw;
  }
  .wraptocenter * {
    vertical-align: middle;
  }
  .track-info {
    padding: 30px 50px 20px 40px;
    color: $white;
  }
  .info-track {
    font-size: 1.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info-artist {
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .track-progress {
    padding: 0px 40px;
    height: 10%;
    display: flex;
  }
  .navBtn {
    background-color: $dark1 !important;
    color: $white;
  }

  .track-controls {
    display: flex;
    align-items: center;
    margin-top: 3vh;
  }
  .control-prev-spacer {
    flex: 20%
  }
  .control-prev {
    flex: 45%;
    text-align: center;
    #prev-btn {
      height: 5vh;
      width: 5vh;
    }
  }
  .control-pause {
    flex: 10%;
    text-align: center;
  }
  .control-next {
    flex: 45%;
    text-align: center;
    #next-btn {
      height: 5vh;
      width: 5vh;
    }
  }
  .control-next-spacer {
    flex: 20%
  }
  .v-center {
    padding-top: 15%;
  }
</style>

<script>
import playbackControl from '@/mixins/playbackControl'
import queueControl from '@/mixins/queueControl'
export default {
  mixins: [ playbackControl, queueControl],
  data() {
    return {
      progressPoll: null
    }
  },
  computed: {
    currentArtists: function() {
      var artists = this.currentTrack.track.artists;
      var artistsStr = artists[0].name;
      for (var i=1;i<artists.length; i++) {
        artistsStr += ', ' + artists[i].name;
      }

      return artistsStr;
    },
  },
  mounted() {
    this.progress = this.$store.getters.playbackPosition;
  },
  beforeDestroy () {
    clearInterval(this.progressPoll);
  },
  created () {
    this.setupPoll();
  },
  methods: {
    setupPoll: function() {
      this.progressPoll = setInterval(() => {
        if (this.playbackState == 'playing') {
          this.updatePlaybackPosition();
        }
      }, 1000)
    },
    printTrack: function() {
      console.log(this.currentTrack);
    },
    minutes: function(ms) {
      return Math.floor((ms/1000) / 60);
    },
    seconds: function(ms) {
      return this.pad(Math.floor((ms/1000) % 60), 2);
    },
    pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
  },
}
</script>