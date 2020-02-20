<template>
  <v-list :style="{background: 'none', top: queueOffset+'vh', position: 'relative'}">
    <v-list-item-group>
      <v-list-item 
        v-for="track in $store.getters.queue" 
        :key="track.tlid"
        :class="queueItemClass($store.getters.queuePosition, track.tlid-1)"
      >
        <div class="queue-info">
          <div class="queue-title">
            {{ track.track.name.toLowerCase() }}
          </div>
          <div class="queue-artist">
            {{ track.track.artists[0].name.toLowerCase() }}
          </div>
        </div>
      </v-list-item>
    </v-list-item-group>
  </v-list> 
</template>

<style lang="scss" scoped>

.queue-info {
  overflow: hidden;

  .queue-title {
    font-size: 1.5em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .queue-artist {
    font-size: 1em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.queue-item {
  height: 10vh;
  padding: 25px;
}

.queue-item.active {
  background-color: $white;
  color: $black;
}

.queue-item.queued {
  background-color: $dark2;
  .queue-info {
    color: $white;
  }
}

.queue-item.played {
  background-color: $dark2;
}

.tr-25 {
  opacity: 0.75;
}

.tr-50 {
  opacity: 0.5;
}

.tr-75 {
  opacity: 0.25;
}

.tr-100 {
  opacity: 0;
}

</style>

<script>
import playbackControl from '@/mixins/playbackControl'
import queueControl from '@/mixins/queueControl'
export default {
  mixins: [playbackControl, queueControl],
  computed: {
    queueOffset: function() {
      return (-10 * this.$store.getters.queuePosition) + 20;
    }
  },
  mounted: function() {
    var vue = this;

    this.$mopidy.on("state:online", function() {
      vue.updateQueue()
      vue.updatePlaybackState()
    })
    this.$mopidy.on("event:trackPlaybackStarted", function() {
      vue.updateQueue()
      vue.updatePlaybackState()
    })
  },
  methods: {
    queueItemClass: function (currentPos, pos) {
      var opacity = 0;

      var type = "queued";
      if (currentPos == pos) {
        type = "active";
      }

      var diff = pos - currentPos;
      //previous
      if (diff < -2) {
        opacity = 100;
      }

      if (diff == -2) opacity = 75;
      if (diff == -1) opacity = 50;

      //next
      if (diff > 2) {
        opacity = 25 * (diff - 2);
      } 

      opacity = Math.abs(opacity);
      if (opacity > 100) {
        opacity = 100;
      }

      return {
        ['tr-'+opacity]: true,
        [type]: true,
        'queue-item': true
      }
    }
  },
  /*computed: {
    displayQueue: function() {
      var pos = $store.getters.queuePosition;

    }
  }*/
}
</script>