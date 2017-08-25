import Vue from 'vue';
import Router from 'vue-router';

import cCategories from '../components/surveys/cCategories.vue';
import cNewSurvey from '../components/surveys/cNewSurvey.vue';
import cSurveys from '../components/surveys/cSurveys.vue';
import cSurvey from '../components/surveys/cSurvey.vue';
import cEnterprise from '../components/enterprises/cEnterprise.vue';
import cListEnterprises from '../components/enterprises/cListEnterprises.vue';
import cNewEnterprise from '../components/enterprises/cNewEnterprise.vue';

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
			path: '/new-enterprise',
			name: 'Novo empreendimento',
			component: cNewEnterprise,
		},
		{
			path: '/new-survey/category/:surveyCategory',
			name: 'Nova enquete',
			component: cNewSurvey,
			props: true,
		},
		{
			path: '/surveys/category/:id',
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
