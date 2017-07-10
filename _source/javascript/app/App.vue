<template>
	<div id="app">
		<div class="wrapper">
			<c-header></c-header>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import cHeader from './components/cHeader.vue';

export default {
	name: 'app',
	components: {
		cHeader,
	},
};
</script>
