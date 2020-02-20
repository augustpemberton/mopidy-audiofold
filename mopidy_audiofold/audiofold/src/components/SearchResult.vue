<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>{{ provider }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card v-if="result.tracks && resultType == 'tracks'">
            <v-list>
              <v-list-item-group>
                <v-list-item 
                  v-for="track in result.tracks" 
                  :key="track.uri"
                  @click="addToQueue({uris: [track.uri]})"
                > 
                  {{ track.name }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>

          <!-- TODO: play artists -->
          <v-card
            v-if="result.artists && resultType == 'artists'"
          >
            <v-list>
              <v-list-item 
                v-for="artist in result.artists" 
                :key="artist.uri"
              > 
                {{ artist.name }}
              </v-list-item>
            </v-list>
          </v-card>

          <!-- TODO: play albums -->
          <v-card 
            v-if="result.albums && resultType == 'albums'"
          >
            <v-list>
              <v-list-item 
                v-for="album in result.albums" 
                :key="album.uri"
              > 
                {{ album.name }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import queueControl from '@/mixins/queueControl';
export default {
  mixins: [queueControl],
  props: {
    'result': {
      type: Object,
      default: function() {
        return {}
      }
    },
    'resultType': {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  computed: {
    provider: function() {
      var provider = 'Other'
      if (this.result.uri.indexOf('spotify') != -1) {
        provider = 'Spotify'
      } else if (this.result.uri.indexOf('soundcloud') != 1) {
        provider = 'Soundcloud'
      }
      return provider;
    }
  }

}
</script>