<template>
  <v-container>
    <v-layout row>
      <v-flex 
        xs12 
        sm10 
        offset-sm1
      >
        <v-toolbar
          color="primary"
          cards
          dark
          flat
        >
          <v-toolbar-title class="title font-weight-medium">Edit Article</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form 
          ref="form"
          v-model="valid"
          lazy-validation 
          class="mb-3"
        >
          <v-text-field  
            v-model="item.title"
            :rules="rules.title"
            name="title" 
            label="Title" 
            type="text"
            required
          ></v-text-field>
          <v-text-field 
            v-model="item.author"
            :rules="rules.author"
            name="author" 
            label="Author" 
            type="text"
          ></v-text-field>
          <v-textarea
            v-model="item.body"
            :rules="rules.body"
            name="body" 
            label="Body" 
            type="text"
            auto-grow
            box
            rows="3"
          ></v-textarea>
        </v-form>
        <v-layout 
          row 
          class="mb-3">
          <v-flex xs12>
            <v-btn 
              class="warning"
              @click="upload"
            >
              Upload
              <v-icon
                right
                dark
              >
                cloud_upload
              </v-icon>
            </v-btn>
            <input 
              ref="file"
              type="file" 
              style="display: none;" 
              accept="image/*"
              @change="onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img 
              v-if="item.fileUrl"
              :src="item.fileUrl" 
              height="200px" 
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-checkbox
              v-model="item.active"
              color="primary"
              label="Active"
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn 
              :loading="loading"
              :disabled="!valid || loading"
              class="success"
              @click="update"
            >Update Article</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
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
      item: {
        id: null,
        title: '',
        author: '',
        body: '',
        active: '',
        file: '',
        fileUrl: ''
      },
      valid: '',
      rules: {
        title: [
          v => !!v || 'Title is require',
          v => v.length <= 50 || "Title must be less than 50 characters"
        ],
        author: [
          v => !!v || 'Author is require',
          v => v.length <= 50 || "Author must be less than 50 characters"
        ],
        body: [
          v => !!v || 'Body is require',
        ]
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  mounted () {
    this.fetch(this.id) 
  },
  methods: {
    fetch (id) {
      proxy.find(id)
      .then(data => {
        this.item = Transformer.fetch(data)
      })
      .catch( e => {
        this.$store.dispatch('setError', 'Fetch article failed' + e.message)
      })
    },
    update () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('article/update', this.item)
      }
    },
    upload () {
      this.$refs.file.click()
    },
    onFileChange () {
      const file = this.$refs.file.files[0];
      const reader = new FileReader()
      reader.onload = () => {
        this.item.fileUrl = reader.result
      }
      reader.readAsDataURL(file)
      this.item.file = file
    },
    uploadFile () {
      this.$refs.file.click()
    },
  }
}
</script>
