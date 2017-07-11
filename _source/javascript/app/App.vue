<template>
	<div id="app">
		<div class="wrapper">
			<c-header></c-header>
			<c-menu></c-menu>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import cHeader from './components/cHeader.vue';
import cMenu from './components/cMenu.vue';

export default {
	name: 'app',
	components: {
		cHeader,
		cMenu,
	},
};
</script>
