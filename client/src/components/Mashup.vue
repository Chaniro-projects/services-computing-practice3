<template>
<div class="home">
	<ke-header index="mashup"></ke-header>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 bloc text-center">
			<h1>Services mashup</h1>
		</div>
		<div class="col-md-5 col-md-offset-1 bloc">
			<div class="loading" v-if="loading1">
				<scale-loader class="spinner"></scale-loader>
			</div>
			<h1>DNS Lookup</h1>
			<div class="col-md-12">
				<h3>Inputs:</h3>
				<div class="form-group label-floating col-md-8">
					<label class="control-label" for="hostname">Hostname</label>
					<input class="form-control" id="hostname" type="text" v-model="hostname">
				</div>
				<div class="col-md-4 text-center">
					<button class="btn btn-primary" v-on:click="go">Request</button>
				</div>
			</div>
			<div class="col-md-12">
				<h3>Output:</h3>
				<div class="form-group label-floating">
					<blockquote>
						{{ip_out}}
					</blockquote>
				</div>
			</div>
		</div>
		<div class="col-md-5 bloc second">
			<div class="loading" v-if="loading2">
				<scale-loader class="spinner"></scale-loader>
			</div>
			<h1>IP Geolocalisation</h1>
			<div class="col-md-12">
				<h3>Inputs:</h3>
				<div class="form-group label-floating col-md-12">
					<label class="control-label" for="ip">IP Adress</label>
					<input class="form-control" id="ip" type="text" v-model="ip" disabled>
				</div>
			</div>
			<div class="col-md-12">
				<h3>Output:</h3>
				<div class="form-group label-floating">
					<blockquote>
						<p v-for="data in geo">
							{{data[0] + ': ' + data[1]}}
						</p>
					</blockquote>
				</div>
			</div>
		</div>
		<div class="col-md-10 col-md-offset-1 bloc">
			<div id="map">
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Header from './Header.vue'
import page from 'page';
import request from 'browser-request'
import Loader from 'vue-spinner/src/ScaleLoader.vue'
let MapAPI = require('google-maps-api')('AIzaSyCgVbLvnDDTeBd5cZBLCBR4gkGNPXrMzpM');


export default {
	data() {
		return {
			hostname: '',
			ip_out: 'IP Adress: ',
			ip: ' ',
			geo: {},
			loading1: false,
			loading2: false,
			center: {
				lat: 0,
				lng: 0
			},
			mapsAPI: {},
			map: {},
			marker: {}
		}
	},
	methods: {
		go: function () {
			this.loading1 = true;
			request('/api/dnslookup/' + this.hostname, (err, response, body) => {
				body = JSON.parse(body);
				this.ip_out = 'IP Adress: ' + body[0].AddressList[0].string[0];
				this.ip = body[0].AddressList[0].string[0];
				this.loading1 = false;

				this.loading2 = true;
				request('/api/geoip/' + this.ip, (err, response, body) => {
					body = JSON.parse(body);
					var data = [];
					for (let attr in body) {
						data.push([
							attr[0].toUpperCase() + attr.substr(1),
							body[attr]
						])
					}
					this.geo = data;
					this.center.lat = parseFloat(body['latitude']);
					this.center.long = parseFloat(body['longitude']);

					this.marker = new this.mapsAPI.Marker({
						position: this.center,
						map: this.map,
						title: this.hostname + '<br/>' + this.ip + '<br/>' + this.region
					});
					this.map.setCenter(this.center);
               this.map.setZoom(8);
					this.loading2 = false;
				})
			})
		}
	},
	components: {
		'ke-header': Header,
		'scale-loader': Loader,
	},
	mounted() {
		$.material.init()
		MapAPI().then(maps => {
			this.mapsAPI = maps;
			console.log('go !');

			var myLatlng = new maps.LatLng(36.3693921, 127.3640249);
			var mapOptions = {
				zoom: 8,
				center: myLatlng,
				mapTypeId: maps.MapTypeId.ROADMAP
			};
			this.map = new maps.Map(document.getElementById("map"),
				mapOptions);
		});
	},
	updated() {
		$.material.init()
	}
}
</script>
