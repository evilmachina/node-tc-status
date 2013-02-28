var tcHelper = require('./tcStatusGetter');
var config = require('./config'); 
var Pixel = require('adafruit-pixel').Pixel;
var lights = new Pixel('/dev/spidev0.0', 64);

var tc = tcHelper(config.hostname, config.port, config.user, config.password);

var off = function(){
    lights.off();
    lights.sync();
}

var buildSuccess = function(){
    //rgb
    lights.all(0, 0xff, 0);
    lights.sync();
}

off();

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
tc.getStatus(handleStatus);
