<script>
import cHeader from './components/cHeader.vue';
import cMenu from './components/cMenu.vue';
import cAlert from './components/cAlert.vue';


export default {
	name: 'app',
	components: {
		cHeader,
		cMenu,
		cAlert,
	},
};
</script>

<template>
	<div id="app">
		<div class="wrapper">
			<c-header></c-header>
			<c-menu></c-menu>
			<router-view></router-view>
		</div>
		<c-alert></c-alert>
	</div>
</template>
