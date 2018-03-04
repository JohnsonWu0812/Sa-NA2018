<template>
    <div class="row">
      <form @submit.prevent="addHost()" method="post">
        <div class = "row">
        <div class = "col-md-3">
        <button type="submit" class="btn btn-info">增加Host</button>
        </div>
        <div class = "col-md-5">
        <input id="newHost" class="form-control" v-model="newHost">
        </div>
        <div class = "col-md-3">
          <button  class="btn btn-info" @click="refresh()">refresh</button>
        </div>
        </div>
      </form>
      <vuetable ref="vuetable"
        pagination-path="" :css="css.table"
        @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded"
        api-url="http://localhost:3000/todo"
        :fields="['hostName', 'active','date']"
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
    newHost:undefined,
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
    }
    }
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
      axios.post('http://localhost:3000/addHost',{
        newHost:this.newHost
      })
      .then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    refresh(){
      this.$refs.vuetable.refresh()
    }
  }
}
</script>

