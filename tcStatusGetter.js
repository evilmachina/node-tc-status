var http = require('http');

var options = {
  hostname: '',
  port: 80,
  path: '/httpAuth/app/rest/builds/?locator=buildType:bt99,count:1,running:any',
  method: 'GET',
  headers: {'Accept':'application/json'}
};

var getStatus = function(calback){   
   http.get(options, function(res) {
        var data = "";
        res.on('data', function (chunk) {
            data = data +chunk;
        }).
        on('end', function () {
            calback(data);
        });
        
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
};

module.exports = function(hostname, port, user, password){
    options.hostname = hostname;
    options.port = port;
    options.auth = user +":"+ password;
    
    return { getStatus:getStatus };
};
