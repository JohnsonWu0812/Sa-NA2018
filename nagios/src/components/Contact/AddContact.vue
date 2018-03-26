<template>
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">新增聯絡人</h4>
        </div>
        <div class="modal-body">
          <form role="form">
            <div class="form-group">
              <label for="contactName">姓名</label>
              <input class="form-control" id="contactName" placeholder="輸入姓名" v-model="contactName" />
            </div>
          <div class="pull-left">
            <label for="contactName">選擇通知方式</label>
            <select v-model="selected" >
              <option>Facebook</option>
              <option>Telephone</option>
              <option>Email</option>
              <option>Skype</option>
              <option>LineID</option>              
            </select>
              <input  class="input-sm" id="information" placeholder="輸入帳號" v-model="information">  
            </div>
          </form>
            <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="addContact()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      contactName:undefined,
      selected:undefined,
      information:undefined
    }
  },
  methods:{
    addContact(){
      console.log(this.selected)
      console.log(this.information)
      console.log(this.contactName)
    }
  }
}
</script>
