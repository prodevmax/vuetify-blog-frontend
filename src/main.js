import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import { router } from './plugins/vue-router'
Vue.config.productionTip = false
store.dispatch('auth/check');
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
