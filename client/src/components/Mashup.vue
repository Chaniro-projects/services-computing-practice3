<template>
<div class="home">
	<ke-header index="mashup"></ke-header>
	<div class="row">
		<div class="col-md-12 text-center title">
			<div class="inside">
				<h1>Mashup</h1>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Header from './Header.vue'
import '../assets/css/mashup.css'
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
