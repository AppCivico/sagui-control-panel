<script>
import icons from './icons';

export default {
	name: 'cIconPicker',
	props: ['seachbox'],
	data() {
		return {
			selected: '',
			iconContent: '',
		};
	},
	computed: {
		searchPlaceholder() {
			return this.seachbox || 'search box';
		},
		icons() {
			return icons;
		},
	},
	methods: {
		cleanIcons() {
			const iconsSelected = Array.from(document.querySelectorAll('.iconPicker__icons .selected'));
			iconsSelected.map((icon) => {
				icon.classList.remove('selected');
			});
		},
		selectIcon(event) {
			const clickTarget = event.target;

			this.cleanIcons();

			if (clickTarget.classList.contains('item')) {
				this.selected = clickTarget.querySelector('i').getAttribute('data-type');
				clickTarget.classList.add('selected');
			} else {
				this.selected = clickTarget.getAttribute('data-type');
				clickTarget.parentNode.classList.add('selected');
			}
			this.getContent(this.selected);
		},
		getContent(icon) {
			const iconContent = window
				.getComputedStyle(document.querySelector(`.fa.${icon}`), ':before')
				.getPropertyValue('content');
			console.log(icon);
			this.convert(iconContent);
		},
		convert(value) {
			let newValue = value.charCodeAt().toString(10);
			//newValue = newValue.replace(/\D/g, '');

			let hexValue = Number(newValue).toString(16);
			while (hexValue.length < 4) {
				hexValue = `0${hexValue}`;
			}

			console.log(hexValue.toUpperCase());
		},
	},
};
</script>

<template>
	<div id="iconPicker">
		<div class="iconPicker__header">
			<input type="text" :placeholder="searchPlaceholder">
		</div>
		<div class="iconPicker__body">
			<div class="iconPicker__icons">
				<a href="#" @click.stop.prevent="selectIcon($event)" class="item" v-for="icon in icons"><i :class="'fa '+icon" :data-type="icon"></i></a>
			</div>
		</div>
	</div>
</template>

<style scoped>
	#iconPicker {
		position: relative;
		max-width: 292px;
		background: #f3f3f3;
	}
	.iconPicker__header {
		padding: 1em;
		border-radius: 8px 8px 0 0;
		border: 1px solid #ccc;
	}
	.iconPicker__header input {
		width: 100%;
		padding: 1em;
	}
	.iconPicker__body {
		position: relative;
		max-height: 250px;
		overflow: auto;
		padding: 1em 0 1em 1em;
		border-radius: 0 0 8px 8px;
		border: 1px solid #ccc;
	}
	.iconPicker__icons {
		display: table;
	}
	.iconPicker__icons .item {
		float: left;
	    width: 40px;
	    height: 40px;
	    padding: 12px;
	    margin: 0 12px 12px 0;
	    text-align: center;
	    border-radius: 3px;
	    font-size: 14px;
	    box-shadow: 0 0 0 1px #ddd;
	    color: inherit;
	}
	.iconPicker__icons .item.selected {
		background: #ccc;
	}
	.iconPicker__icons .item i {
		box-sizing: content-box;
	}
</style>
