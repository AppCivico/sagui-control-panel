import Vue from 'vue';
import Router from 'vue-router';

import cLogin from '../components/login/cLogin.vue';
import c404 from '../components/layout/c404.vue';
import cCategories from '../components/surveys/cCategories.vue';
import cNewSurvey from '../components/surveys/cNewSurvey.vue';
import cSurveys from '../components/surveys/cSurveys.vue';
import cSurvey from '../components/surveys/cSurvey.vue';
import cResults from '../components/surveys/cResults.vue';
import cEnterprise from '../components/enterprises/cEnterprise.vue';
import cListEnterprises from '../components/enterprises/cListEnterprises.vue';
import cNewEnterprise from '../components/enterprises/cNewEnterprise.vue';
import cEditEnterprise from '../components/enterprises/cEditEnterprise.vue';
import cNotifications from '../components/notifications/cNotifications.vue';
import cComplaints from '../components/complaints/cComplaints.vue';
import cComplaint from '../components/complaints/cComplaint.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '',
			name: 'Login',
			component: cLogin,
		},
		{
			path: '*',
			name: '404',
			component: c404,
		},
		{
			path: '/enterprises',
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
			path: '/edit-enterprise/:id',
			name: 'Editar empreendimento',
			component: cEditEnterprise,
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
		{
			path: '/results',
			name: 'Resultados',
			component: cResults,
		},
		{
			path: '/notifications',
			name: 'Notifications',
			component: cNotifications,
		},
		{
			path: '/complaints/:status',
			name: 'Complaints',
			component: cComplaints,
			props: true,
		},
		{
			path: '/complaint/:id',
			name: 'Complaint',
			component: cComplaint,
			props: true,
		},
	],
});
