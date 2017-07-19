import Vue from 'vue';

// register
Vue.filter('capitalize', function (value) { // eslint-disable-line prefer-arrow-callback, func-names
	if (!value) return '';
	return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
});
