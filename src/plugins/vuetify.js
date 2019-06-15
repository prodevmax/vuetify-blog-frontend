import Vue from 'vue'
import Vuetify, {
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VForm,
  VTextField,
  transitions,
  VDataTable,
  VDivider,
  VImg,
  VSwitch,
  VCheckbox,
  VTextarea,
  VSnackbar
} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VCard,
    VForm,
    VToolbar,
    VTextField,
    transitions,
    VDataTable,
    VDivider,
    VImg,
    VSwitch,
    VCheckbox,
    VTextarea,
    VSnackbar
  },
  iconfont: 'md'
})