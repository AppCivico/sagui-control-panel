// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import App from './App.vue';
import store from './store';
import router from './router';
import translations from './translations';

Vue.filter('capitalize', function (value) { // eslint-disable-line prefer-arrow-callback, func-names
	if (!value) return '';
	return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
});

new Vue({ // eslint-disable-line no-new, no-unused-vars
	el: '#app',
	store,
	router,
	translations,
	render: h => h(App),
});

Raven
    .config('https://707827dad6334ea08dad9b6f031bc077@sentry.io/<project>')
    .addPlugin(RavenVue, Vue)
    .install();
