import Vue from 'vue';
import Router from 'vue-router';

import cCategories from '../components/cCategories.vue';
import cEnterprise from '../components/cEnterprise.vue';
import cListEnterprises from '../components/cListEnterprises.vue';
import cNewSurvey from '../components/cNewSurvey.vue';
import cSurveys from '../components/cSurveys.vue';
import cSurvey from '../components/cSurvey.vue';

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
		{
			path: '/new-survey',
			name: 'Nova enquete',
			component: cNewSurvey,
		},
		{
			path: '/surveys/categorie/:id',
			name: 'Enquetes',
			component: cSurveys,
			props: true,
		},
		{
			path: '/surveys/:id',
			name: 'Enquete',
			component: cSurvey,
			props: true,
		},
		{
			path: '/categories',
			name: 'Categorias',
			component: cCategories,
		},
	],
});
