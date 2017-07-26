import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const api = 'http://localhost:3000';

const store = new Vuex.Store({
	state: {
		alertMessage: '',
		categories: [],
		enterprises: [],
		enterprise: {},
		redirect: {
			state: false,
			path: '',
		},
		surveys: [],
		survey: {},
	},
	actions: {
		LOAD_CATEGORIES_LIST({ commit }) {
			axios.get(`${api}/categories`).then((response) => {
				commit('SET_CATEGORIES_LIST', { list: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		CHANGE_ALERT_MESSAGE({ commit }, message) {
			commit('SET_ALERT_MESSAGE', { res: { message } });
		},
		LOAD_ENTERPRISES_LIST({ commit }) {
			axios.get(`${api}/enterprises`).then((response) => {
				commit('SET_ENTERPRISES_LIST', { list: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_ENTERPRISE({ commit }, id) {
			axios.get(`${api}/enterprises/${id}`).then((response) => {
				commit('SET_ENTERPRISE', { res: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_SURVEYS_LIST({ commit }, id) {
			axios.get(`${api}/surveys?category=${id}`).then((response) => {
				commit('SET_SURVEYS_LIST', { list: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		LOAD_SURVEY({ commit }, id) {
			axios.get(`${api}/surveys/${id}`).then((response) => {
				commit('SET_SURVEY', { res: response.data });
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		SAVE_SURVEY({ commit }, data) {
			axios({
				method: 'POST',
				url: `${api}/surveys`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Enquete salva', redirect: { state: true, path: '-1' } } });
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		EDIT_SURVEY({ commit }, data) {
			axios({
				method: 'PUT',
				url: `${api}/surveys/${data.id}`,
				data: data.survey,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Alterações salvas', redirect: { state: true, path: '-1' } } });
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		DELETE_SURVEY({ commit }, id) {
			axios({
				method: 'DELETE',
				url: `${api}/surveys/${id}`,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Enquete excluída' } });
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		RESET_REDIRECT({ commit }) {
			commit('SET_REDIRECT_STATE');
		},
	},
	mutations: {
		SET_ALERT_MESSAGE(state, { res }) {
			if (res.redirect) {
				// eslint-disable-next-line
				state.redirect.state = res.redirect.state;
				// eslint-disable-next-line
				state.redirect.path = res.redirect.path;
			}
			// eslint-disable-next-line
			state.alertMessage = res.message;
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
		SET_REDIRECT_STATE(state) {
			// eslint-disable-next-line
			state.redirect.state = false;
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
