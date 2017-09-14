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
				const iconsDiv = document.querySelector('.iconPicker__icons');

				array.map((item) => {
					iconsDiv.insertAdjacentHTML('beforeend', `<a href="#" @click="this.selectIcon($event)"><i class="fa fa-${item}"></i></a>`);
				});
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
		selectIcon(event) {
			console.log(event.target);
		},
	},
};
</script>

<template>
	<div v-observe-visibility="visibilityChanged" id="iconPicker">
		<div class="iconPicker__icons"></div>
	</div>
</template>

<style scoped>
	#iconPicker {
		position: relative;
	}
	.iconPicker__icons {
		position: absolute;
		top: 0;
		left: 0;
		max-width: 320px;
	}
	.iconPicker__icons a {
		display: inline-block;
		width: 25%;
		border: 1px solid #000;
		text-align: center;
		vertical-align: middle;
	}
	.iconPicker__icons a i {
		vertical-align: middle;
	}
</style>
