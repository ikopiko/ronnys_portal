import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMask from 'v-mask'
import VueRouter from 'vue-router'
//import vco from "v-click-outside"
import router from './router/index'
import Scrollspy from 'vue2-scrollspy';
import VueSweetalert2 from 'vue-sweetalert2';
import vuetify from '@/plugins/vuetify'


import { rtdbPlugin as VueFire } from 'vuefire'

import "../src/design/app.scss";

import store from '@/state/store'

import App from './App.vue'

import { initFirebaseBackend } from './authUtils'
import i18n from './i18n'

import { configureFakeBackend } from './helpers/fake-backend';

import tinymce from 'vue-tinymce-editor'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else {
  configureFakeBackend();
}
Vue.use(VueFire)
Vue.component('tinymce', tinymce)
Vue.use(VueRouter)
// Vue.use(vco)
Vue.use(Scrollspy);
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo)
Vue.config.productionTip = false

// Vue.prototype.$hostname = "https://api.ronnys.info/rest/web/index.php?r=v1/";  // TEST

// Vue.prototype.$authHostName = "https://api.ronnys.info/rest/web/index.php?r=auth";  // TEST

Vue.prototype.$hostname = "http://45.138.44.229/~ccyvsvam/api/rest/web/index.php?r=v1/";  // IP

Vue.prototype.$authHostName = "http://45.138.44.229/~ccyvsvam/api/rest/web/index.php?r=auth";  // IP



Vue.prototype.$hostSaburtalo = "http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/";  // SABURTALO

Vue.prototype.$hostVake = "http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/";  // VAKE

Vue.prototype.$hostDigomi = "http://109.172.176.98:8082/ronny/rest/web/index.php?r=v1/";  // DIGOMI

Vue.prototype.$hostGldani = "http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/";  // GLDANI


Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(require('vue-chartist'))
Vue.use(VueSweetalert2);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    libraries: 'places',
  },
  installComponents: true
})
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
