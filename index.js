var express = require('express')
 , http = require('http')
 , bodyParser = require('body-parser')
 , endpoints = require('ruuvi.endpoints.js');

var app = express();

app.set('port', process.env.PORT || 5375);

app.use(express.static(__dirname + '/public/images'));
app.use(bodyParser.json({limit:1024102420, type:'application/json'}));

app.post('/data/',function(request,response,next){
/*
  [ { timestamp: '2017-12-28T12:33:38Z',
    type: 'Unknown',
    mac: 'D6A911ADA763',
    bleName: '',
    rssi: -29,
    rawData: '02010415FF990403401713B9CC001CFFF804080BC50000000000' },
  { timestamp: '2017-12-28T12:33:38Z',
    type: 'Unknown',
    mac: 'D6A911ADA763',
    bleName: '',
    rssi: -39,
    rawData: '02010415FF990403401713B9CC001CFFF804080BC50000000000' },
  { timestamp: '2017-12-28T12:33:40Z',
    type: 'Unknown',
    mac: 'D6A911ADA763',
    bleName: '',
    rssi: -40,
    rawData: '02010415FF990403401712B9CB0020FFFC04000BC50000000000' } ] */


  let samples=request.body;

  let arrayLength = samples.length;
  for (let ii = 0; ii < arrayLength; ii++) {
  	//Get data from each sample. 
    if(samples[ii].rawData && samples[ii].rawData.length > 12 ){
      //console.log(samples[ii].rawData);
      const buf = Buffer.from(samples[ii].rawData, 'hex');
      latestSample = endpoints.parse(buf.slice(7));
      //console.log(buf.slice(8).toString('hex'));
      console.log(JSON.stringify(latestSample));
    }
  }
  response.send('hello world');
} );


http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
