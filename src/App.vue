<template>
  <v-app>
    <Navbar></Navbar>
    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        :value="true"
        color="error"
        @input="closeError"
      >
        {{ error }}
        <v-btn
          dark
          flat
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {}
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  mounted() {
    if (this.$store.state.auth.authenticated) {
      this.$store.dispatch('user/find');
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
}
</script>
