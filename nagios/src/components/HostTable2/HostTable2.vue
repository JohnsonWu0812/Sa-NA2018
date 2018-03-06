<template>
  <div>
    <div class="row">
      <form @submit.prevent="addHost()" method="post">
        <div class="col-sm-4" style="padding-left:0px;">
          <label for="newHostName">HostName</label>
          <input type="text" class="form-control" id="newHostName" v-model="newHostName">
        </div>
        <div class="col-sm-4" style="padding-left:0px;">
          <label for="ipAddress">IP</label>
          <input id="ipAddress" class="form-control" v-model="ipAddress">
        </div>
        <label>&nbsp;</label>
        <span class="col-xs-4" style="padding-right:0px;">
                <button type="submit" class="btn btn-success pull-left">增加Host&nbsp;</button>
                <button class="btn btn-info pull-right" type="button" @click="refreshed()">重新整理</button>
            </span>
      </form>
    </div>
    <div class="row">
      <vuetable ref="vuetable" pagination-path="" :css="css.table" :sort-order="sortOrder" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" api-url="http://localhost:3000/todo" :fields="fields">
        <template slot="actions" slot-scope="props">
                  <div class="table-button-container">
                    <button class="btn btn-danger btn-sm" @click="deleteHost(props.rowData)">
                      <span class="glyphicon glyphicon-trash"></span>刪除主機</button>&nbsp;&nbsp;
                  </div>
        </template>
      </vuetable>
      <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
  </div>
</template>

<script>
  const axios = require('axios')
  export default {
    components: {},
    data() {
      return {
        newHostName: undefined,
        ipAddress: undefined,
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
        sortOrder: [{
          field: 'hostName',
          direction: 'asc'
        }],
        fields: [{
            name: 'hostName',
            title: '<span class="orange glyphicon glyphicon-book"></span> 主機名稱'
          },
          {
            name: 'ipAddress',
            title: 'IP'
          },
          {
            name: 'active',
            title: '狀態'
          },
          {
            name: 'date',
            title: '檢查時間'
          },
          '__slot:actions'
        ],
      }
    },
    mounted() {},
    methods: {
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
      },
      onChangePage(page) {
        this.$refs.vuetable.changePage(page)
      },
      onLoading() {
        console.log('loading... show your spinner here')
      },
      onLoaded() {
        console.log('loaded! .. hide your spinner here')
      },
      addHost() {
        console.log('ipAddress' + this.ipAddress)
        console.log('newHostName' + this.newHostName)
        axios.post('http://localhost:3000/addHost', {
            newHost: this.newHostName,
            ipAddress: this.ipAddress
          })
          .then((res) => {
            this.initForm()
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
      },
      initForm() {
        this.newHostName = undefined
        this.ipAddress = undefined
      },
      refreshed() {
        this.$refs.vuetable.refresh()
      },
      deleteHost(hostData){
        axios.post('http://localhost:3000/deleteHost',{
          hostName:hostData.hostName
        })
      }
    }
  }
</script>

