<template>
<div class="home">
	<ke-header index="ws1"></ke-header>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 bloc text-center">
			<h1>DNS Lookup</h1>
		</div>
      <div class="col-md-10 col-md-offset-1 bloc">
			<h3>Inputs:</h3>
			<div class="form-group label-floating">
				<label class="control-label" for="hostname">Hostname</label>
				<input class="form-control" id="hostname" type="text">
			</div>
		</div>
      <div class="col-md-10 col-md-offset-1 bloc">
			<h3>Output:</h3>
			<div class="form-group label-floating">
				<label class="control-label" for="ip">IP Adress</label>
				<input class="form-control" id="ip" type="text" disabled>
            Log: {{log}}
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Header from './Header.vue'
import '../assets/css/ws.css'
import page from 'page';
import request from 'browser-request'

export default {
	data() {
		return {
         log: ''
      }
	},
	components: {
		'ke-header': Header,
	},
	mounted() {
		$.material.init()
      request('http://www.google.fr', (err, response, body) => {
         this.log = body;
      })
	},
	updated() {
		$.material.init()
	}
}
</script>
