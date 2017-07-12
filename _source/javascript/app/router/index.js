import Vue from 'vue';
import Router from 'vue-router';

import ListEnterprises from '../components/ListEnterprises.vue';
import Enterprise from '../components/Enterprise.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Empreendimentos',
			component: ListEnterprises,
		},
		{
			path: '/enterprises/:id',
			name: 'Empreendimento',
			component: Enterprise,
		},
	],
});
