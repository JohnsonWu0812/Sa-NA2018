var ping = require('ping')
var moment = require('moment')
export default class Host{
    constructor(hostList,responseList){
        this.hostL = hostList
        this.responseL = responseList
    }
    setResponseHost(host,callback){
        var hostInfo = {}
        ping.sys.probe(host.ipAddress, function(active){
          hostInfo.contact = []
          hostInfo.hostName = host.hostName
          hostInfo.ipAddress = host.ipAddress
          hostInfo.active =  active ? 'Up' :  'Down'
          hostInfo.date = moment().format('YYYY/MM/DD  HH:mm:ss')
          hostInfo.contact=host.contact
          if(callback)callback(hostInfo)
        })  
      }
    updateAllHostInterval(){
        var frequency = 200
        var self = this
        var setIntervalId  = setInterval(function() {
            self.pingHost()
        }, frequency)
        return setIntervalId
    }
    pingHost(callback){
        var self = this
        this.hostL.forEach(function(host){
            self.setResponseHost(host,function(hostInfo){
            for(var i = 0 ; i <self.responseL.length; i++)
            {
              if(self.responseL[i].hostName === host.hostName)
                {
                    self.responseL[i].active =  hostInfo.active
                    self.responseL[i].date  = hostInfo.date
                }
            }
          })
        })
        return this.responseList
    }
    setEachResponeHost(callback){
        var count = 0
        var self = this
        this.hostL.forEach(function(host){
          self.setResponseHost(host,function(hostInfo){
            self.responseL.push(hostInfo)
                callback(self.responseL)
          })
        })
      
      }
    getAllHost(){
          return this.responseL
      }
}
