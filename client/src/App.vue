<template>
	<div id="app">
        <component v-bind:is="getView"></component>
	</div>
</template>

<script>
import Vue from "vue";

import "bootstrap-material-design";
import "./assets/css/main.css";

export default{
	props: ['route'],
	computed: {
		getView() {
			return this.route != '' ? require('./components/' + this.route + '.vue') : null;
		}
	},
	mounted() {
		$.material.init()
	},
	updated() {
		$.material.init()
	},
	render (h) { return h(this.getView) }
}

</script>
