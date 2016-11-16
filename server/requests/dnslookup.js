const request = require('request');
const parseString = require('xml2js').parseString;

class DNSLookupClient {
	constructor() {}

	go(hosname) {
		let soapMessage = base.request.replace('{{hosname}}', hosname);

		return new Promise((ok, ko) => {
			var options = {
				url: base.url,
				headers: {
					"Content-Type": "text/xml;charset=UTF-8",
					"SOAPAction": "http://tempuri.org/DNSLookup",
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

module.exports = new DNSLookupClient();

const base = {
	request: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.strikeiron.com" xmlns:tem="http://tempuri.org/">
   <soapenv:Header>
      <ws:LicenseInfo>
         <ws:RegisteredUser>
            <ws:UserID>bastien.baret@gmail.com</ws:UserID>
            <ws:Password>mwtFKO</ws:Password>
         </ws:RegisteredUser>
      </ws:LicenseInfo>
   </soapenv:Header>
   <soapenv:Body>
      <tem:DNSLookup>
         <tem:server>{{hosname}}</tem:server>
      </tem:DNSLookup>
   </soapenv:Body>
</soapenv:Envelope>`,
	url: 'http://ws.strikeiron.com/relauto/iplookup/DNS'
}
