<template>
<div class="home">
	<ke-header index="1"></ke-header>
	<div class="row">
		<div class="col-md-12 text-center title">
			<div class="inside">
				<h1>About</h1>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Header from './Header.vue'
import '../assets/css/about.css'
import page from "page";

export default {
	data() {
		return {
		}
	},
	components: {
		'ke-header': Header,
	},
	mounted() {
		$.material.init()
	},
	updated() {
		$.material.init()
	}
}
</script>
