import model from '../src/model'
var assert = require('assert');
let hostList=[]
describe('Save Data', function() {
  describe('prepare an array ', function() {
    it('should return -1 when the value is not present', function() {
       hostList = ['192.168.0.1','192.168.0.2']
    })
    it('test',function(){
       model.saveData(hostList)
       model.readData()
    })
  })
})