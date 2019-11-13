import Vue from 'vue'
import App from './App.vue'
import './assets/css/styles.css'
import './assets/css/bootstrap.css'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ReactiveSearch from '@appbaseio/reactivesearch-vue'
import store from './store'
import './firebase'
import VueSession from 'vue-session'
import CiaoVuePopup from 'ciao-vue-popup'
Vue.use(CiaoVuePopup)

//import VueCarousel from 'vue-carousel'

//import Router from 'vue-router'

//import Vuex from 'vuex'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ReactiveSearch)
Vue.use(VueSession)
//Vue.use(VueCarousel)

Vue.prototype.$axios = axios

Vue.prototype.$backend = 'https://us-central1-solar-cycle-256312.cloudfunctions.net/myWebsiteBackend'

//Vue.prototype.$http = axios;
//const token = localStorage.getItem('token')
//if (token) {
 // Vue.prototype.$http.defaults.headers.common['Authorization'] = token
//}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


this.$popup('append', {
  component: ComponentForm,
  apply: {
    callback(data) {
      alert(`Quantity: ${data}`)
    }
  },
})