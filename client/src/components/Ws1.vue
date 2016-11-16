<template>
<div class="home">
	<ke-header index="ws1"></ke-header>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 bloc text-center">
			<h1>DNS Lookup</h1>
		</div>
      <div class="col-md-10 col-md-offset-1 bloc">
         <div class="loading" v-if="loading">
            <scale-loader class="spinner"></scale-loader>
         </div>
			<h3>Inputs:</h3>
			<div class="form-group label-floating col-md-9">
				<label class="control-label" for="hostname">Hostname</label>
				<input class="form-control" id="hostname" type="text" v-model="hostname">
			</div>
         <div class="col-md-3 text-center">
            <button class="btn btn-primary" v-on:click="go">Request</button>
         </div>
		</div>
      <div class="col-md-10 col-md-offset-1 bloc">
			<h3>Output:</h3>
			<div class="form-group label-floating">
            <blockquote>
               {{ip}}
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
         hostname: '',
         ip: 'IP Adress: ',
         loading: false
      }
	},
   methods: {
      go: function() {
         this.loading = true;
         request('/api/dnslookup/' + this.hostname, (err, response, body) => {
            body = JSON.parse(body);
            this.ip = 'IP Adress: ' + body[0].AddressList[0].string[0];
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
