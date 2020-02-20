export default {
  methods: {
    updateQueue() {
      var vue = this;
      vue.$mopidy.tracklist.getTlTracks().then(queue => {
        vue.$store.commit('setQueue', queue);
      }).catch(err => {
        console.log(err)
      })

      vue.$mopidy.tracklist.index().then(position => {
        vue.$store.commit('setQueuePosition', position);
      }).catch(err => {
        console.log(err);
      })
    },
    clearQueue() {
      this.$mopidy.tracklist.clear();
      this.updateQueue();
    },
    addToQueue(tracks) {
      this.$mopidy.tracklist.add(tracks)
      if (this.$store.getters.playbackState != 'playing') {
        this.$mopidy.playback.play();
      }
      this.updateQueue();
    },
  }
}