<template>
    <div class="row">
      <form @submit.prevent="addHost()" method="post">
      <button type="submit" class="btn btn-info">增加Host
      <input id="newHost" class="form-control" v-model="newHost"></button>
      </form>
      <vuetable ref="vuetable"
        api-url="http://localhost:3000/todo"
        :fields="['hostName', 'active','date']"
      ></vuetable>
    </div>
</template>

<script>
const axios = require('axios')
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  components: {
    Vuetable
  },
  data(){
    return{
    newHost:undefined      
    }
  },
  methods:{
    addHost(){
      axios.post('http://localhost:3000/addHost',{
        newHost:this.newHost
      })
      .then((res)=>{
        this.$refs.Vuetable.refresh()
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

