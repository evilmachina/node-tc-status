"use strict";

var tcHelper = require('./tcStatusGetter');
var config = require('./config'); 
var LightStrips = require('./LPD8806').LightStrips;

var numberOfLEDs = 64;
var lights = new LightStrips('/dev/spidev0.0', numberOfLEDs);

var tc = tcHelper(config.hostname, config.port, config.user, config.password);

var off = function(){
    lights.off();
};

var buildSuccess = function(){
    //rgb
    lights.all(0, 255, 0);
    lights.sync();
};

var buildFailed = function(){
    //rgb
    lights.all(255, 0, 0);
    lights.sync();
};
var building = function(percentageComplete){
    var start = 0; 
    var end = ~~(numberOfLEDs * (percentageComplete / 100));
    lights.fill(255, 0, 255, start, end);
    lights.fill(0, 0, 0, end, numberOfLEDs);
    lights.sync();
};

var handleStatus = function(data){
    //console.log(data);
    var lastbuild = JSON.parse(data).build[0];
    
    if(lastbuild.running){
       building(lastbuild.percentageComplete);
    }else if(lastbuild.status == "FAILURE"){
         buildFailed();
    }else if(lastbuild.status == "SUCCESS"){
         buildSuccess();
    }
   
};

off();
setInterval(tc.getStatus, 1000, handleStatus);

