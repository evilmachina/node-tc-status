var tcHelper = require('./tcStatusGetter');
var config = require('./config');
var animations = require('./animations/animations'); 


var tc = tcHelper(config.hostname, config.port, config.user, config.password);

var handleStatus = function(data){
    
    var lastbuild = JSON.parse(data).build[0];
    
    if(lastbuild.status == "SUCCESS" && lastbuild.running){
       console.log('building'); 
    }else if(lastbuild.status == "FAILED"){
         console.log('faild'); 
    }else if(lastbuild.status == "SUCCESS"){
         console.log('success'); 
    }
   
};
tc.getStatus(handleStatus);