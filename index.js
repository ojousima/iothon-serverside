var express = require('express')
 , http = require('http');

var app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public/images'));


app.post('/data/',function(request,response,next){


app.use(express.bodyParser());

   var keyName=request.query.Key;
   console.log(keyName);

} );


http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});