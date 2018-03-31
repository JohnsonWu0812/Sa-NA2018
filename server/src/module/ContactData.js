import FileOperater from './FileOperater'
import FacebookObserver from './Observer/FacebookObserver'
import EmailObserver from './Observer/FacebookObserver'

export default class ContactData{
    constructor(contactName,communicate,hostName){
        this.contactName = contactName
        this.communicate = communicate
        this.hostName = hostName
    }
    emergencyContact(emergencyContact){
        console.log('emergecy'+JSON.stringify(emergencyContact))
    }
}