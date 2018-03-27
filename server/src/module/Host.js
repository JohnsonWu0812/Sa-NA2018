var ping = require('ping')
var moment = require('moment')
export default class Host{
    constructor(hostList,responseList){
    }
    setResponseHost(host,callback){
        var hostInfo = {}
        ping.sys.probe(host.ipAddress, function(active){
          hostInfo.contact = []
          hostInfo.hostName = host.hostName
          hostInfo.ipAddress = host.ipAddress
          hostInfo.active =  active ? 'Up' :  'Down'
          hostInfo.date = moment().format('YYYY/MM/DD  HH:mm:ss')
          hostInfo.contact.push(host.contact)
          if(callback)callback(hostInfo)
        })  
      }
}
