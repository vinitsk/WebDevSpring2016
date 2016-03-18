var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world');
});
app.get('/api/user  s', function(req,res){
    var user =[
        {'username' :'bob1', 'first':'bob', 'last':'marley'},
        {'username' :'bob2', 'first':'bob', 'last':'marley'},
        {'username' :'bob3', 'first':'bob', 'last':'marley'}
    ];
    res.json(user);
});
app.listen(port, ipaddress);