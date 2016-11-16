<template>
<div class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
			<a class="navbar-brand" href="/">
				<img src="../assets/img/icon.png">
				<b>Services computing</b>
			</a>
		</div>
		<div class="navbar-collapse collapse navbar-responsive-collapse">
			<ul class="nav navbar-nav">
				<li v-bind:class="{active:index === 'ws1'}"><a href="/ws1">Web service 1</a></li>
				<li v-bind:class="{active:index === 'ws2'}"><a href="/ws2">Web service 2</a></li>
            <li v-bind:class="{active:index === 'mashup'}"><a href="/mashup">Mashup</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li v-bind:class="{active:index === 'about'}"><a href="/about">About</a></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
import '../assets/css/header.css'
import page from 'page'

export default {
   props: ['index'],
	data() {
		return {}
	},
	mounted() {
		$.material.init()
	},
	updated() {
		$.material.init()
	}
}
</script>
