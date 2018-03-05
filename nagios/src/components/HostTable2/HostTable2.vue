<template>
    <div class="row">
      <div class="col-sm-12">
        <div class = "row">
          <div class = "col-md-9" style="padding-left:0">
      <form @submit.prevent="addHost()" method="post">
            <div class="input-group">
              <label for="newHostName">HostName:&nbsp;&nbsp;&nbsp;</label>
              <input type="text" class="form-control" id="newHostName" v-model="newHostName">
              <label for="ipAddress">&nbsp;&nbsp;ip:&nbsp;&nbsp;&nbsp;</label>
              <input id="ipAddress" class="form-control" v-model="ipAddress">
              <button type="submit" class="btn btn-info">增加Host</button>
            </div>
                  </form>
          </div>
          <div class = "col-xs-3" style="padding-right:0">
            <button  class="btn btn-info" @click="refreshed()">refresh</button>
          </div>
        </div>
      </div>
      <br><br>
      <vuetable ref="vuetable"
        pagination-path="" :css="css.table"
        :sort-order="sortOrder"
        @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded"
        api-url="http://localhost:3000/todo"
        :fields="['hostName', 'ipAddress','active','date']"
      ></vuetable>
      <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
</template>

<script>
const axios = require('axios')

export default {
  components: {
  },
  data(){
    return{
    newHostName:undefined,
    ipAddress:undefined,
    css: {
        table: {
          tableClass: 'table table-striped table-bordered table-hovered',
          loadingClass: 'loading',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down',
          handleIcon: 'glyphicon glyphicon-menu-hamburger'
        },
        pagination: {
          infoClass: 'pull-left',
          wrapperClass: 'vuetable-pagination pull-right',
          activeClass: 'btn-primary',
          disabledClass: 'disabled',
          pageClass: 'btn btn-border',
          linkClass: 'btn btn-border',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: ''
          }
        }
      },
      sortOrder: [
      { field: 'hostName', direction: 'asc' }
      ]   
    }
  },
   mounted () {

  },
  methods:{
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    addHost(){
      console.log('ipAddress'+ this.ipAddress)
      console.log('newHostName' + this.newHostName)
      axios.post('http://localhost:3000/addHost',{
        newHost:this.newHostName,
        ipAddress: this.ipAddress
      })
      .then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    refreshed(){
      this.$refs.vuetable.refresh()
    }
  }
}
</script>

