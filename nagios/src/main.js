// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetable from '../node_modules/vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from '../node_modules/vuetable-2/src/components/VuetablePagination.vue'


Vue.use('vuetable',Vuetable)
Vue.use('vuetable-pagination',VuetablePagination)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data:{
    comments:{
      Vuetable: Vuetable,
      VuetablePagination: VuetablePagination
    }
  }
})
