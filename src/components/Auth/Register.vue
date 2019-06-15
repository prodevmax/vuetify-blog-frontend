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
            <v-toolbar-title>Register</v-toolbar-title>
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
              <v-text-field
                :rules="confirmPasswordRules"
                :counter="20"
                v-model="confirmPassword"
                prepend-icon="repeat"
                name="confirm-password"
                label="Confirm Password"
                type="password"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="onSubmit"
            > Register
            </v-btn>
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
      confirmPassword: '',
      valid: false,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 30) || 'Username must be less than 30 characters'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 30) || 'Password must be less than 30 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm Password is required',
        v => v === this.password || 'Password is not confirmed'
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          username: this.username,
          password: this.password
        }
        this.$store.dispatch('auth/register', user);
      }
    }
  }
}
</script>
