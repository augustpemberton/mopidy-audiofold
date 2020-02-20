import playbackState from './playbackState'
import queueControl from './queueControl'

export default {
  mixins: [ playbackState, queueControl ],
  methods: {
    play() {
      this.$mopidy.playback.play()
      this.updateAll();
    },
    pause() {
      this.$mopidy.playback.pause()
      this.updateAll();
    },
    prev() {
      this.$mopidy.playback.previous()
      this.play();
      this.updateAll();
    },
    next() {
      this.$mopidy.playback.next()
      this.play();
      this.updateAll();
    },
    seek(newPos) {
      this.$mopidy.playback.seek({time_position: newPos});
      this.updateAll();
    }
  }
}