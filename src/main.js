import Vue from 'vue'
import Router from 'vue-router'
//import App from './App.vue'
import routes from './routes'
import Root from './components/Layouts/Root'

import { BootstrapVue } from 'bootstrap-vue'
import {store} from './store/store';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

// Install BootstrapVue
Vue.use(BootstrapVue)

// Install Route
Vue.use(Router)

Vue.use(VueMoment, {
  moment,
})

Vue.config.productionTip = false

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiredGuess)) {
    if (store.getters.loggedIn) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(Root),
}).$mount('#app')
