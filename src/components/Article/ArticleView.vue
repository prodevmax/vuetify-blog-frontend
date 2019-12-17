<template>
  <v-container>
    <section class="article mt-3 elevation-10">
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-img
              :src="article.fileUrl"
              class="white--text"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">{{ article.title }}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text">{{ article.author }}</span><br>
                <span>Whitehaven Beach</span><br>
                <span>Whitsunday Island, Whitsunday Islands</span>
              </div>
            </v-card-title>
            <v-card-text>
              <div>
                <p> {{ article.body }}</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                color="blue"
                @click="edit(id)" 
              >
                Edit
              </v-btn>
              <v-btn
                flat
                color="red"
                @click="destroy(id)"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>
<script>
import ArticleProxy from '@/proxies/ArticleProxy'
import Transformer from '@/transformers/ArticleTransformer'
const proxy = new ArticleProxy()
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      article: {
        title: null,
        author: null,
        body: null,
        file: null,
        fileUrl: ''
      }
    }
  }, 
  mounted () {
    this.fetch(this.id) 
  },
  methods: {
    edit (id) {
      this.$router.push({
        name: 'article.edit',
        params: {
            id: id
        } 
      })
    },
    destroy (id) {
      if(!confirm('Are you sure you want to delete this item?')) return
      this.$store.dispatch('article/destroy', id)
    },
    fetch (id) {
      proxy.find(id)
      .then( data => {
        this.article = Transformer.fetch(data)
      })
      .catch( () => {
        this.$store.dispatch('setError', 'Fetch article failed')
      });
    },
  }
}
</script>
