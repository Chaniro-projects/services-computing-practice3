const request = require('request');
const parseString = require('xml2js').parseString;

class GeoIPClient {
	constructor() {}

	go(ip) {
		let soapMessage = base.request.replace('{{ip}}', ip);

		return new Promise((ok, ko) => {
			var options = {
				url: base.url,
				headers: {
					"Content-Type": "text/xml;charset=UTF-8",
					"SOAPAction": "http://v1.fraudlabs.com/ip2locationwebservice.asmx/IP2Location",
					"Content-Length": soapMessage.length.toString(),
					"Connection": "Keep-Alive",
					"User-Agent": "Apache-HttpClient/4.1.1 (java 1.5)"
				},
				method: 'POST',
				body: soapMessage
			};

			request.post(options, (err, res, body) => {
				if (err)
					ko(err);

				parseString(body, function(err, result) {
					ok(result);
				});
			})
		})
	}
}

module.exports = new GeoIPClient();

const base = {
   request: `
   <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="v1.fraudlabs.com">
      <soapenv:Header/>
      <soapenv:Body>
         <v1:IP2Location soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <inputdata xsi:type="ip2:IP2LocationInput" xmlns:ip2="http://v1.fraudlabs.com/soap/IP2LocationWebService">
               <IP xsi:type="xsd:string">{{ip}}</IP>
               <LICENSE xsi:type="xsd:string">02-00H3-VAJ3</LICENSE>
            </inputdata>
         </v1:IP2Location>
      </soapenv:Body>
   </soapenv:Envelope>
   `,
   url: 'http://v1.fraudlabs.com/ip2locationwebservice.asmx'
}
