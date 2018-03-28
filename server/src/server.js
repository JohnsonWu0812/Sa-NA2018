import FileOperater from './module/FileOperater'
import Host from './module/Host'

let hostManage
let fileOperater = new FileOperater
var express = require('express')
var app = express()
const cors = require('cors')
let bodyPaser = require('body-parser')
let responseList = []
let hostList =[]
let setIntervalId

app.use(bodyPaser.urlencoded({extended:true}))
app.use(bodyPaser.json())
app.use(cors())
app.options('*',cors())


app.listen(3000, function () {
  var self = this
  fileOperater.readData(function(data){
    hostList = data
    hostManage = new Host(hostList,responseList)
    for(var i = 0 ; i<hostList.length ; i++)
    {
      if(hostList[i].contact===undefined)
      hostList[i].contact=[]
    }
    hostManage.setEachResponeHost(function(res){
      setIntervalId=hostManage.updateAllHostInterval()
      console.log('All Host Data were added ')
    })
  })
  console.log('Example app listening on port 3000!');
})

app.post('/addHost',function(req,res){
  if(req.body.hostName === undefined || req.body.ipAddress === undefined)
  res.send('')
  else if(hostList.map(function(e) { return e.hostName}).indexOf(req.body.hostName)> 0 )
   res.send('There has same host')
  else{
    hostList.push(
      {
      hostName : req.body.hostName,
      ipAddress : req.body.ipAddress,
      contact:[]
    })
    fileOperater.saveData(hostList)
    hostManage.setResponseHost(req.body,function(hostInfo){
      res.send('Host: "'+ req.body.hostName + '" was added success')
      responseList.push(hostInfo)
    })
  }
})
app.post('/deleteHost',function(req,res){
  clearInterval(setIntervalId)
  deleteHost(function(hostList){
    setIntervalId=hostManage.updateAllHostInterval()
        fileOperater.saveData(hostList)
        res.send('host'+ hostList.hostName +'has been delete')
    })
  function deleteHost(callback){
    hostList = hostList.filter(function(hostData){
      return hostData.hostName !== req.body.hostName
    })
    responseList = responseList.filter((hostData)=>{
      return hostData.hostName !== req.body.hostName
    })
    callback(hostList)
  }
})
app.get('/getHostsData', function (req, res) {
    let page = req.query.page
    let per_page = req.query.per_page
    let current_page = 1
    let last_page = 1
    let prev_page_url = null
    let domain = "http://localhost:3000/getHostsData"
    let vuetableFormat = {}
    if(page){
      current_page = page * 1
    }
      if(responseList.length % 10 === 0 && responseList.length !== 0){
        last_page = responseList.length / 10
      }
      else{
          last_page = Math.round(responseList.length / 10) + 1
      }                               
      if(current_page > 1){
          prev_page_url = domain + '&sort=&page=' + (current_page - 1) +'&per_page=' + per_page
      }             
      vuetableFormat.total = responseList.length
      vuetableFormat.per_page = per_page
      vuetableFormat.current_page = current_page
      vuetableFormat.last_page = last_page
      vuetableFormat.next_page_url = domain + '&sort=&page=' + (current_page + 1) +'&per_page=' + per_page
      vuetableFormat.prev_page_url = prev_page_url
      vuetableFormat.from = 1 + 10 * (current_page - 1)
      vuetableFormat.to = 10 * current_page
      vuetableFormat.data = responseList.slice(vuetableFormat.from - 1 , vuetableFormat.to)
      res.json(vuetableFormat)
 
})
app.get('/getContact',function(req,res){
  console.log(hostList)
  console.log(responseList)
  var specificHost = responseList.filter((eachHost)=>{
    return eachHost.hostName === req.query.hostName
  })
  var contactList = specificHost[0].contact
  if(contactList !== undefined){
  for(var i=0 ; i <contactList.length;i++)
  {
    for(var j=0 ; j<contactList[i].communicate.length;j++){
        if(contactList[i].communicate[j].type==='Facebook')
          contactList[i].facebookAddress =  contactList[i].communicate[j].address
        if(contactList[i].communicate[j].type==='Telephone')
          contactList[i].telephoneAddress =  contactList[i].communicate[j].address
        if(contactList[i].communicate[j].type==='Email')
          contactList[i].emailAddress =  contactList[i].communicate[j].address
        if(contactList[i].communicate[j].type==='Skype')
          contactList[i].skypeAddress =  contactList[i].communicate[j].address
        if(contactList[i].communicate[j].type==='LineID')
          contactList[i].lineIDAddress =  contactList[i].communicate[j].address
      }
    
  }
  }
  let page = req.query.page
  let per_page = req.query.per_page
  let current_page = 1
  let last_page = 1
  let prev_page_url = null
  let domain = "http://localhost:3000/todo"
  let vuetableFormat = {}
  if(contactList === undefined)
  contactList = []
  if(page){
    current_page = page * 1
  }
    if(contactList.length % 10 === 0 &&contactList.length !== 0){
      last_page =contactList.length / 10
    }
    else{
        last_page = Math.round(contactList.length / 10) + 1
    }                               
    if(current_page > 1){
        prev_page_url = domain + '&sort=&page=' + (current_page - 1) +'&per_page=' + per_page
    }             
    vuetableFormat.total =contactList.length
    vuetableFormat.per_page = per_page
    vuetableFormat.current_page = current_page
    vuetableFormat.last_page = last_page
    vuetableFormat.next_page_url = domain + '&sort=&page=' + (current_page + 1) +'&per_page=' + per_page
    vuetableFormat.prev_page_url = prev_page_url
    vuetableFormat.from = 1 + 10 * (current_page - 1)
    vuetableFormat.to = 10 * current_page
    vuetableFormat.data =contactList.slice(vuetableFormat.from - 1 , vuetableFormat.to)
    res.json(vuetableFormat)
  
})

app.post('/addContact',function(req,res){
  console.log(req.body)
  console.log('before'+JSON.stringify(responseList))
  for(var i = 0 ; i <responseList.length ;i++){
      if(hostList[i].hostName === req.body.hostName)
      {
        if(hostList[i].contact === undefined)
          hostList[i].contact = [req.body]
        else{
            hostList[i].contact.push(req.body)
            console.log('gg')
          }
      }
      // hostList[i].contact === undefined? hostList[i].contact = [req.body] :hostList[i].contact.push(req.body)
      if(responseList[i].hostName === req.body.hostName);
        responseList[i].contact === (undefined)? responseList[i].contact = [req.body] :responseList[i].contact.push(req.body)
      if(i === responseList.length-1)
      {
        fileOperater.saveData(hostList)
        res.send('add success')
        console.log('after'+JSON.stringify(responseList))
        
      }
    }
  }
)
