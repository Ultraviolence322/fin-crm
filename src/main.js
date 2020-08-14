import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from "vuejs-paginate";
import Meta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localeFilter from './filters/locale.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import Loader from "@/components/app/Loader";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Meta)
Vue.use(Vuelidate)
Vue.use(messagePlugin)

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('locale', localeFilter)

Vue.directive('tooltip', tooltipDirective)

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyAYp8tqN4huKd3frwp9UMl74dvmT7HVjds",
  authDomain: "vue-fin-crm-15103.firebaseapp.com",
  databaseURL: "https://vue-fin-crm-15103.firebaseio.com",
  projectId: "vue-fin-crm-15103",
  storageBucket: "vue-fin-crm-15103.appspot.com",
  messagingSenderId: "505591337769",
  appId: "1:505591337769:web:012793da81769e01db9d38"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


