var tcHelper = require('./tcStatusGetter');
var config = require('./config'); 
var LightStrips = require('./LPD8806').LightStrips;
var lights = new LightStrips('/dev/spidev0.0', 4);

var tc = tcHelper(config.hostname, config.port, config.user, config.password);

var off = function(){
    lights.off();
}

var buildSuccess = function(){
    //rgb
    lights.all(0, 255, 0);
    lights.sync();
}

var buildFailed = function(){
    //rgb
    lights.all(255, 0, 0);
    lights.sync();
}
var building = function(percentageComplete){
    //rgb
    lights.all(255, 0, 255);
    lights.sync();
}

off();

var handleStatus = function(data){
    console.log(data);
    var lastbuild = JSON.parse(data).build[0];
    
    if(lastbuild.running){
       console.log('building');
       building(lastbuild.percentageComplete);
    }else if(lastbuild.status == "FAILURE"){ 
         console.log('faild');
         buildFailed();
    }else if(lastbuild.status == "SUCCESS"){
         console.log('success'); 
         buildSuccess();
    }
   
};

setInterval(tc.getStatus, 2000, handleStatus);

