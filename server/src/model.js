var fs = require('fs')
function saveData(hostList){
  var file = fs.createWriteStream('./hostList.txt')
  file.on('error', function(err) { /* error handling */ })
     file.write(hostList.join(' \n'));
  file.end()
}
function readData(callback){
  let hostList= []
  fs.readFile("./hostList.txt", "utf8", function(err, data){
    hostList.push(data)
    console.log(data)
  })
  console.log(hostList)
}
  export default { saveData , readData}