var tcHelper = require('./tcStatusGetter');
var config = require('./config'); 
var LightStrips = require('./LPD8806').LightStrips;
var lights = new LightStrips('/dev/spidev0.0', 4);

var tc = tcHelper(config.hostname, config.port, config.user, config.password);

var off = function(){
    lights.off();
    lights.sync();
}

var buildSuccess = function(){
    //rgb
    lights.all(0, 255, 0);
    lights.sync();
    lights.sync();
    lights.sync();
    lights.sync();
}

//off();
setTimeout(buildSuccess , 2000);

var handleStatus = function(data){
    console.log(data);
    var lastbuild = JSON.parse(data).build[0];
    
    if(lastbuild.status == "SUCCESS" && lastbuild.running){
       console.log('building'); 
    }else if(lastbuild.status == "FAILED"){
         console.log('faild'); 
    }else if(lastbuild.status == "SUCCESS"){
         console.log('success'); 
         buildSuccess();
    }
   
};
//tc.getStatus(handleStatus);
