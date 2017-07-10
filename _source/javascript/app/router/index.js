import Vue from 'vue';
import Router from 'vue-router';

import Hello from '../components/Hello.vue';
import Menu from '../components/Menu.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'List of Entries',
			component: Hello,
		},
		{
			path: '/oi',
			name: 'List of',
			component: Menu,
		},
	],
});
