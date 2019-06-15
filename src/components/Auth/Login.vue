<template>
  <v-container 
    fluid 
    fill-height>
    <v-layout 
      align-center 
      justify-center>
      <v-flex 
        xs12 
        sm8 
        md4>
        <v-card class="elevation-12">
          <v-toolbar 
            dark 
            color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form 
              ref="form" 
              v-model="valid" 
              lazy-validation>
              <v-text-field
                :rules="usernameRules"
                v-model="username"
                prepend-icon="person"
                name="username"
                label="Username"
                type="text"
              >
              </v-text-field>
              <v-text-field
                :rules="passwordRules"
                :counter="20"
                v-model="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              @click="onSubmit"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      valid: false,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 20) || 'Username must be less than 20 characters'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 20) || 'Password must be less than 20 characters'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          username: this.username,
          password: this.password
        }
        this.$store.dispatch('auth/login', user);
      }
    }
  }
}
</script>
