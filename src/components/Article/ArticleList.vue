<template>
  <v-container>
    <v-layout row>
      <v-flex 
        xs12 
        sm10
        offset-sm1>
        <v-toolbar 
          color="primary"
          dark
          cards
          flat 
        >
          <v-toolbar-title class="font-weight-medium">Articles</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn 
            :to="{ name: 'article.create'}"
            light
            color="primary"
            class="mb-2"
          >
            Create Article
          </v-btn>
        </v-toolbar>
        <articles-items :articles="items"></articles-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import ArticlesItems from './ArticleItems'
export default {
  components: {
      ArticlesItems
  },
  computed: mapGetters({
      items: 'article/getAll'
  }),
  mounted () {
     this.fetchAll() 
  },
  methods: mapActions({
    'fetchAll': 'article/fetchAll',
  })
}
</script>
