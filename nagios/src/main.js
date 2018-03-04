// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '/Users/wu/Desktop/Se-Na2018/nagios/node_modules/bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.css'
import HostTable2 from './components/HostTable2/HostTable2'
import TopButton from './components/TopButton'

Vue.config.productionTip = false
Vue.use(HostTable2)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
