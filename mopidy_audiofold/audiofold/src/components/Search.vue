/* eslint-disable */
<template>
  <div class="search-form">
    <v-text-field  
      v-model="searchTerm" 
      placeholder="Search"
    />
    <v-btn @click="search(searchTerm)"> 
      Search 
    </v-btn>
    <v-tabs>
      <v-tab>
        Tracks
      </v-tab>
      <v-tab-item>
        <search-result 
          v-for="result in searchResults" 
          :key="result.uri"
          :result="result"
          :result-type="'tracks'"
        />
      </v-tab-item>
      <v-tab>
        Artists
      </v-tab>
      <v-tab-item>
        <search-result 
          v-for="result in searchResults" 
          :key="result.uri"
          :result="result"
          :result-type="'artists'"
        />
      </v-tab-item>
      <v-tab>
        Albums
      </v-tab>
      <v-tab-item>
        <search-result 
          v-for="result in searchResults" 
          :key="result.uri"
          :result="result"
          :result-type="'albums'"
        />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import queueControl from '@/mixins/queueControl'
export default {
  mixins: [ queueControl ],
  data: function() {
      return {
        searchResults: [],
        searchTerm: ''
      }
  },
  methods: {
    search(searchTerm) {
      var vue = this;
      var query = {'any': [searchTerm]}
      this.$mopidy.library.search({query: query, exact: false})
      .then(results => {
        console.log(results);
        vue.searchResults = results;
      })
    },

    
  }
}
</script>