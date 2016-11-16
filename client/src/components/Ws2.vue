<template>
<div class="home">
	<ke-header index="ws2"></ke-header>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 bloc text-center">
			<h1>IP Geolocalisation</h1>
		</div>
      <div class="col-md-10 col-md-offset-1 bloc">
         <div class="loading" v-if="loading">
            <scale-loader class="spinner"></scale-loader>
         </div>
			<h3>Inputs:</h3>
			<div class="form-group label-floating col-md-9">
				<label class="control-label" for="ip">IP Adress</label>
				<input class="form-control" id="ip" type="text" v-model="ip">
			</div>
         <div class="col-md-3 text-center">
            <button class="btn btn-primary" v-on:click="go">Request</button>
         </div>
		</div>
      <div class="col-md-10 col-md-offset-1 bloc">
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
</div>
</template>

<script>
import Header from './Header.vue'
import page from 'page';
import request from 'browser-request'
import Loader from 'vue-spinner/src/ScaleLoader.vue'

export default {
	data() {
		return {
         ip: '',
         geo: {},
         loading: false
      }
	},
   methods: {
      go: function() {
         this.loading = true;
         request('/api/geoip/' + this.ip, (err, response, body) => {
            body = JSON.parse(body);
            var data = [];
            for(let attr in body) {
               data.push([
                  attr[0].toUpperCase() + attr.substr(1),
                  body[attr]
               ])
            }
            this.geo = data;
            this.loading = false;
         })
      }
   },
	components: {
		'ke-header': Header,
      'scale-loader': Loader
	},
	mounted() {
		$.material.init()
	},
	updated() {
		$.material.init()
	}
}
</script>
