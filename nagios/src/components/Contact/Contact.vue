<template>
<div>
    <!-- <contact-top-bar></contact-top-bar> -->
    <ul class="nav navbar-nav navbar-left">
       <a class="navbar-brand">{{this.hostName}}</a>&nbsp;&nbsp;&nbsp;&nbsp;
    </ul>
    <ul class="nav navbar-nav navbar-right">
            <button class="btn btn-primary btn-sm" @click="enterCourse(props.rowData)">
            <span class="glyphicon glyphicon-user"></span> 新增聯絡人</button>
            <button class="btn btn-primary btn-sm" @click="backList()">
            <span class="glyphicon glyphicon-log-out"></span> HostList</button>
    </ul>
    <div class="row">      
      <div class="col-md-12">
           <contact-table :contactUrl="this.contactUrl" :hostIP="this.hostIP"></contact-table>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactTable from './ContactTable'
import ContactTopBar from './ContactTopBar'

export default {
  data(){
      return{
      }
  },
  components: {
      ContactTopBar,
    ContactTable
  },
  computed: {
    ...mapGetters({contactUrl: 'getContactUrl', hostIP: 'getIP',hostName:'getHostName'})
  },
  methods:{
      backList(){
          this.$router.push({
                path: '/nagios-hw1'
          })
      }

  }
}
</script>