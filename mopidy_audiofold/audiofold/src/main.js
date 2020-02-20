import Vue from 'vue'
import App from './App.vue'
import Mopidy from 'mopidy'

import Search from './components/Search'
import PlaybackComponent from './components/PlaybackComponent'
import SearchResult from './components/SearchResult'
import QueueComponent from './components/QueueComponent'
import MiniPlayback from './components/MiniPlayback'

Vue.component('search', Search)
Vue.component('playback', PlaybackComponent)
Vue.component('search-result', SearchResult)
Vue.component('queue', QueueComponent);
Vue.component('mini-playback', MiniPlayback);

// setup mopidy
var mopidy = new Mopidy({
  webSocketUrl: "ws://192.168.0.37:6680/mopidy/ws/"
});
Object.defineProperty(Vue.prototype, '$mopidy', { value: mopidy});

//setup vuex
import { store } from './store/store'

import vuetify from './plugins/vuetify';
import router from './router'

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)


Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
