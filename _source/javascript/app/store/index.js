import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		alertMessage: 'nana',
		categories: [],
		enterprises: [],
		enterprise: {},
		surveys: [],
		survey: {},
	},
	actions: {
		LOAD_CATEGORIES_LIST({ commit }) {
			axios.get('http://localhost:3000/categories').then((response) => {
				commit('SET_CATEGORIES_LIST', { list: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
			});
		},
		CHANGE_ALERT_MESSAGE({ commit }, message) {
			commit('SET_ALERT_MESSAGE', { res: message });
		},
		LOAD_ENTERPRISES_LIST({ commit }) {
			axios.get('http://localhost:3000/enterprises').then((response) => {
				commit('SET_ENTERPRISES_LIST', { list: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
			});
		},
		LOAD_ENTERPRISE({ commit }, id) {
			axios.get(`http://localhost:3000/enterprises/${id}`).then((response) => {
				commit('SET_ENTERPRISE', { res: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
			});
		},
		LOAD_SURVEYS_LIST({ commit }, id) {
			axios.get(`http://localhost:3000/surveys?category=${id}`).then((response) => {
				commit('SET_SURVEYS_LIST', { list: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
			});
		},
		LOAD_SURVEY({ commit }, id) {
			axios.get(`http://localhost:3000/surveys/${id}`).then((response) => {
				commit('SET_SURVEY', { res: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
			});
		},
		SAVE_SURVEY({ commit }, data) {
			axios({
				method: 'POST',
				url: 'http://localhost:3000/surveys',
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: 'Enquete salva' });
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
			});
		},
		EDIT_SURVEY({ commit }, id, data) {
			console.log(data);
			axios({
				method: 'PUT',
				url: `http://localhost:3000/surveys/${id}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: 'Alterações salvas' });
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
			});
		},
	},
	mutations: {
		SET_ALERT_MESSAGE(state, { res }) {
			// eslint-disable-next-line
			state.alertMessage = res;
			$('#alert').modal('show'); // eslint-disable-line no-undef
		},
		SET_CATEGORIES_LIST(state, { list }) {
			// eslint-disable-next-line
			state.categories = list;
		},
		SET_ENTERPRISES_LIST(state, { list }) {
			// eslint-disable-next-line
			state.enterprises = list;
		},
		SET_ENTERPRISE(state, { res }) {
			// eslint-disable-next-line
			state.enterprise = res;
		},
		SET_SURVEYS_LIST(state, { list }) {
			// eslint-disable-next-line
			state.surveys = list;
		},
		SET_SURVEY(state, { res }) {
			// eslint-disable-next-line
			state.survey = res;
		},
	},
	getters: {
	},
});

export default store;
