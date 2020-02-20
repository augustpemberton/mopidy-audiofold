export default {
  methods: {
    updatePlaybackState() {
      var vue = this;
      vue.$mopidy.playback.getState().then(state => {
        vue.$store.commit('setPlaybackState', state);
      }).catch(err => {
        console.log(err);
      })
    },
    updatePlaybackPosition() {
      var vue = this;
      vue.$mopidy.playback.getTimePosition().then(pos => {
        vue.$store.commit('setPlaybackPosition', pos);
      }).catch(err => {
        console.log(err);
      })
    },
    updateAll() {
      var vue = this;
      vue.updateQueue()
      vue.updatePlaybackState()
      vue.updatePlaybackPosition();
    }
  },
  mounted: function(){
    var vue = this;
    
    this.$mopidy.on("state:online", function() {
      vue.updateAll();
    })
    this.$mopidy.on("event:trackPlaybackStarted", function() {
      vue.updateAll();
    })
    this.$mopidy.on('event:trackPlaybackResumed', () => {
      vue.updateAll();
    })
    this.$mopidy.on('event:trackPlaybackPaused', () => {
      vue.updateAll();
    })

  },
  computed: {
    currentTrack() {
      return this.$store.getters.queue[this.$store.getters.queuePosition];
    },
    playbackState() {
      return this.$store.getters.playbackState;
    }
  },
  asyncComputed: {
    imgSrc() {
      return new Promise((resolve, reject) => {
        var cur = this.currentTrack;
        if (cur) {
          this.$mopidy.library.getImages({uris: [cur.track.uri]}).then(result => {
            resolve(result[cur.track.uri][1].uri);
          }).catch(err => {
            reject(err);
          })
        }
      })
    }
  },
}