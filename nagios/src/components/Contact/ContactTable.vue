<template>
    <div class ="row">
       <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="contactUrl">
            <template slot="actions" slot-scope="props">
                    <div class="table-button-container">
                         <button class="btn btn-success btn-sm" @click="enterCourse(props.rowData)">
                         <span class="glyphicon glyphicon-stats"></span> 進入課程</button>
                    </div>
            </template>
          </vuetable>
         <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
</template>
<script>
export default {
  data () {
    return {
      fields: [
        {
          name: 'coursename',
          title: '<span class="orange glyphicon glyphicon-book"></span> contact name'
        },
        {
          name: 'courseteacher',
          title: 'email address1' 
        },
        {
          name: 'classtime',
          title: 'email address2'
        },
        {
          name: 'population',
          title: 'email address3'
        },
        {
          name: 'coursedescription',
          title: 'email address4'
        },
        {
          name: 'coursedescription',
          title: 'email address5'
        },
        '__slot:actions'
      ],
      sortOrder: [
      { field: 'name', direction: 'asc' }
      ],
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
  mounted () {
      console.log(this.contactUrl)
    console.log(this.hostIP)
  },
  props: ['hostIP', 'contactUrl'],
  methods: {
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
  }
}
</script>