var tcHelper = require('./tcStatusGetter');
var config = require('./config');


var tc = tcHelper(config.hostname, config.port, config.user, config.password);

var handleStatus = function(data){
    console.log(data);
}
tc.getStatus(handleStatus);