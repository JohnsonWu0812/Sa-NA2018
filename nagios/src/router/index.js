import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HostTable from '@/components/HostTable2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HostTable',
      component: HostTable
    }
  ]
})
