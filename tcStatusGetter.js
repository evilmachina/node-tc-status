var http = require('http');

var options = {
  hostname: '',
  port: 80,
  path: '/httpAuth/app/rest/builds/?locator=buildType:bt2,count:1,running:any',
  method: 'GET',
  headers: {'Accept':'application/json'}
};

var getStatus = function(){   
   http.get(options, function(res) {
        console.log("Got response: " + res.statusCode);
        console.log(res);
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

module.exports = function(hostname, port, user, password){
    options.hostname = hostname;
    options.port = port
    options.auth = user +":"+ password;
    
    return { getStatus:getStatus };
}
