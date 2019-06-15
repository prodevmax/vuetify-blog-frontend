<template>
  <div>
    <v-navigation-drawer 
      v-model="sideNav" 
      app 
      temporary>
      <v-list>
        <v-list-tile
          v-if="isAutentificated"
          @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile 
          v-for="(link, i) in links" 
          :key="i" 
          :to= "link.url">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      app 
      dark 
      color="primary">
      <v-toolbar-side-icon 
        class="hidden-md-and-up" 
        @click="sideNav=!sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>Admin panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
          v-for= "(link, i) in links"
          :key= "i"
          :to= "{ name: link.name}"
          flat
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn 
          v-if="isAutentificated"
          flat
          @click="onLogout"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
    }
  },
  computed: {
    isAutentificated () {
      return this.$store.state.auth.authenticated
    },
    links () {
      if (this.isAutentificated) {
        return [
          { title: 'Articles', icon: 'list', name: 'article.list' }
        ]
      }
      return [
        { title: 'Login', icon: 'account_box', name: 'login' },
        { title: 'Register', icon: 'face', name: 'register' },
      ]
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  },
}
</script>
