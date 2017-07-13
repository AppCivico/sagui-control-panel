import Vue from 'vue';
import Router from 'vue-router';

import cListEnterprises from '../components/cListEnterprises.vue';
import cEnterprise from '../components/cEnterprise.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Empreendimentos',
			component: cListEnterprises,
		},
		{
			path: '/enterprises/:id',
			name: 'Empreendimento',
			component: cEnterprise,
			props: true,
		},
	],
});
