import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    playbackState: '',
    playbackPosition: 0,
    queue: [],
    queuePosition: 0,
  },
  mutations: {
    setPlaybackState(state, playbackState) {
      state.playbackState = playbackState;
    },
    setPlaybackPosition(state, pos) {
      state.playbackPosition = pos;
    },
    setQueue(state, queue) {
      state.queue = queue;
    },
    setQueuePosition(state, position) {
      state.queuePosition = position;
    }
  },
  getters: {
    playbackState: state => state.playbackState,
    playbackPosition: state => state.playbackPosition,
    queue: state => state.queue, 
    queuePosition: state => state.queuePosition
  }
})