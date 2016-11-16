const appDir = "../client";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const DNSlookupClient = require('./requests/dnslookup.js')
const GeoIPClient = require('./requests/geoip.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/dnslookup/:hostname', function(req, res) {
   DNSlookupClient.go(req.params.hostname)
      .then(json => res.json(json['soap:Envelope']['soap:Body'][0]['DNSLookupResponse'][0]['DNSLookupResult']))
      .catch(err => res.json(err));
})

app.get('/api/geoip/:ip', function(req, res) {
   GeoIPClient.go(req.params.ip)
      .then(json => {
         var base = json['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:IP2LocationResponse'][0].return[0];
         res.json({
            countrycode: base['COUNTRYCODE'][0]['_'],
            countryname: base['COUNTRYNAME'][0]['_'],
            region: base['REGION'][0]['_'],
            latitude: base['LATITUDE'][0]['_'],
            longitude: base['LONGITUDE'][0]['_']
         });
      })
      .catch(err => res.json(err));
})

app.use(express.static(appDir));

app.all("/*", function(req, res, next) {
	res.sendfile("index.html", {
		root: __dirname + "/" + appDir
	});
});

app.listen(3000, function() {
	console.log('Server started on :3000');
});
