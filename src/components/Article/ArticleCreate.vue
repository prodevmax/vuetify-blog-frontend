<template>
  <v-container>
    <v-layout row>
      <v-flex
        xs12
        sm8
        offset-sm2>
        <v-toolbar
          color="primary"
          cards
          dark
          flat
        >
          <v-toolbar-title class="title font-weight-medium">Create Article</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form 
          ref="form"
          v-model="valid"
          lazy-validation 
          class="mb-3"
        >
          <v-text-field  
            v-model="title"
            :rules="[v => !!v || 'Title is require']"
            name="title" 
            label="Title" 
            type="text"
            required
          ></v-text-field>
          <v-text-field 
            v-model="author"
            :rules="[v => !!v || 'Author is require']"
            name="author" 
            label="Author" 
            type="text"
          ></v-text-field>
          <v-textarea
            v-model="body"
            :rules="[v => !!v || 'Body is require']"
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
              :src="fileUrl"
              height="200px" 
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-checkbox
              v-model="active"
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
              @click="create"
            >Create Article</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      author: '',
      body: '',
      active: false,
      valid: false,
      file: null,
      fileUrl: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    create () {
      if (this.$refs.form.validate() && this.file) {
        const data = {
          title: this.title,
          author: this.author,
          body: this.body,
          active: this.active,
          file: this.file
        }
        this.$store.dispatch('article/create', data)
      }
    },
    upload () {
      this.$refs.file.click()
    },
    onFileChange () {
      const file = this.$refs.file.files[0];
      const reader = new FileReader()
      reader.onload = e => {
        this.fileUrl = reader.result
      }
      reader.readAsDataURL(file)
      this.file = file
    }
  }
}
</script>
