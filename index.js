const express = require('express')
 , http = require('http')
 , bodyParser = require('body-parser')
 , endpoints = require('ruuvi.endpoints.js')
 , IOTA = require('iota.lib.js');

// not really used as we don't do any TX with value changes.
const MWM = 15;
const seed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
const targetAddress = '999999999999999999999999999999999999999999999999999999999999999999999999999IOTHON';
var targetTag = "9999HELLOIOTAFROMIOTHON9999"
var depth = 1;
const options = {}; //Empty

var iota = new IOTA({
  host: "http://iri1.iota.fm:80"
});

iota.api.getNodeInfo((error, nodeInfo) => {
	console.log("Querying");
    if (error) {
        console.error('getNodeInfo error', error);
    } else {
        console.log('getNodeInfo result', nodeInfo);
    }
});

var lock = false;

var app = express();

app.set('port', process.env.PORT || 5375);

app.use(express.static(__dirname + '/public/images'));
app.use(bodyParser.json({limit:1024102420, type:'application/json'}));

var unlock = function(){
  console.log("Unlocking");
  lock = false;
}

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
    if(!lock && samples[ii].rawData && samples[ii].rawData.length > 12 ){
    	lock = true;
      //console.log(samples[ii].rawData);
      //const buf = Buffer.from(samples[ii].rawData, 'hex');
      //latestSample = endpoints.parse(buf.slice(7));
      //console.log(buf.slice(8).toString('hex'));
      //console.log(JSON.stringify(latestSample));
      console.log(samples[ii]);
      let trytedata = iota.utils.toTrytes(JSON.stringify(samples[ii]));
      console.log(trytedata);
      let transfer = {
      	address: targetAddress,
        value: 0,
        message: trytedata,
        tag: targetTag
      };
      let transfers = [transfer];
      iota.api.sendTransfer(seed, depth, MWM, transfers, options, (error, transactions) => {
        if (error) {
          console.error('sendTransfer error', error);
          lock = false;
        } else {
          console.log('transactions sent!', transactions);
          lock = false;
        }
      });
      console.log("Transfer in pipe");
    }
  }
  response.send('hello world');
} );


http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
