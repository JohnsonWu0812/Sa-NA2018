var express = require('express')
var app = express()
var ping = require('ping')
let hostList = []
let oldHostList = []
let count =  0
let info = {}

const cors = require('cors')

app.use(cors())
app.options('*',cors())

app.listen(3000, function () {
  getHostStatus()
  console.log('Example app listening on port 3000!');
})

function getHostStatus(){
  var host2 = ['192.168.0.1','192.168.0.2','google.com','yahoo.com.tw']
  var frequency = 1000 //1 second
      setInterval(function() {
        host2.forEach(function(host){
          ping.sys.probe(host, function(active){
            info.hostName = host
            info.active =  active ? 'Active' :  ' Non-Active'
            hostList.push(info)
            info ={}
          })
        })
        if(oldHostList !== hostList)
          oldHostList = hostList
        hostList = []
      }, frequency)
}

app.get('/todo', function (req, res) {
  let page = req.query.page
  let per_page = req.query.per_page
  let current_page = 1
  let last_page = 1
  let prev_page_url = null
  let domain = "http://localhost:3000/todo"
  let vuetableFormat = {}
  if(page){
    current_page = page * 1
  }
    if(oldHostList.length % 10 === 0 && oldHostList.length !== 0){
      last_page = oldHostList.length / 10
    }
    else{
        last_page = Math.round(oldHostList.length / 10) + 1
    }                               
    if(current_page > 1){
        prev_page_url = domain + '&sort=&page=' + (current_page - 1) +'&per_page=' + per_page
    }             
    vuetableFormat.total = oldHostList.length
    vuetableFormat.per_page = per_page
    vuetableFormat.current_page = current_page
    vuetableFormat.last_page = last_page
    vuetableFormat.next_page_url = domain + '&sort=&page=' + (current_page + 1) +'&per_page=' + per_page
    vuetableFormat.prev_page_url = prev_page_url
    vuetableFormat.from = 1 + 10 * (current_page - 1)
    vuetableFormat.to = 10 * current_page
    vuetableFormat.data = oldHostList.slice(vuetableFormat.from - 1 , vuetableFormat.to)
    console.log(vuetableFormat)
    res.json(vuetableFormat)
})
