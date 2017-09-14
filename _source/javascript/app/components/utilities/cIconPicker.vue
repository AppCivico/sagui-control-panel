<script>
import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';
import axios from 'axios';

Vue.use(VueObserveVisibility);

export default {
	name: 'cIconPicker',
	data() {
		return {
			icons: '',
		};
	},
	methods: {
		getIconsList() {
			axios.get('https://rawgit.com/FortAwesome/Font-Awesome/master/src/icons.yml').then((response) => {
				const data = response.data;
				const id = data.split('\n')
					.filter(item => item.indexOf(' id:') > 0);
				const array = id.map(item => item.replace('id:', '').trim());
				console.log(array);
			}, (err) => {
				console.error(err);
			});
		},
		visibilityChanged(isVisible) {
			if (isVisible) {
				this.getIconsList();
			}
		},
	},
};
</script>

<template>
	<h1 v-observe-visibility="visibilityChanged">Icons</h1>
</template>
