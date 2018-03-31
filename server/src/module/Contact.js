import FileOperater from './FileOperater'
import FacebookObserver from './Observer/FacebookObserver'
import EmailObserver from './Observer/FacebookObserver'

export default class Contact{
    constructor(){

    }
    addContact(req,hostManage,callback){
        var hostList = hostManage.getHostList()
        var responseList = hostManage.getAllHost()
        var fileOperater = new FileOperater
        var self = this
        for(var i = 0 ;i <hostList.length ; i++){
            if(hostList[i].hostName === req.body.hostName)
            {
              if(hostList[i].contact === undefined)    
              hostList[i].contact = [req.body]
              else{
                    hostList[i].contact.push(req.body)
                    responseList[i].contact = hostList[i].contact
                }
            }
            if(i === hostList.length-1)
            { 
              hostManage.setHostList(hostList)  
              hostManage.setResponseH(responseList)                           
              fileOperater.saveData(hostList)
            }
        }
    }
    emergencyContact(emergencyContact){
        console.log('emergecy'+JSON.stringify(emergencyContact))
    }
}