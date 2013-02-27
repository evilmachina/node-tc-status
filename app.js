var tcHelper = require('./tcStatusGetter');

var hostname = '10.0.1.13'
    ,port = '8111'
    ,user = 'xxx'
    ,password = 'xxx'

var tc = tcHelper(hostname, port, user, password);

tc.getStatus();