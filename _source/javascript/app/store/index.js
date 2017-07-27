import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// const api = 'http://localhost:3000';
const api = 'https://fakeapi.eokoe.com';

/* eslint-disable arrow-body-style */
axios.interceptors.request.use((config) => {
	document.querySelector('.loading').classList.remove('close');
	return config;
}, (error) => {
	// Do something with request error
	return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use((response) => {
	document.querySelector('.loading').classList.add('close');
	return response;
}, (error) => {
	// Do something with response error
	return Promise.reject(error);
});

/* eslint-enable */

const store = new Vuex.Store({
	state: {
		alertMessage: '',
		categories: [],
		confirm: {
			message: '',
			state: false,
		},
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
		CHANGE_REDIRECT({ commit }, data) {
			commit('SET_REDIRECT', { data });
		},
		CHANGE_CONFIRM_MESSAGE({ commit }, data) {
			commit('SET_CONFIRM_MESSAGE', { data });
		},
		EDIT_CONFIRM_STATE({ commit }, confirm) {
			commit('SET_CONFIRM_STATE', { res: confirm });
		},
		ADD_CATEGORY({ commit }, data) {
			axios({
				method: 'POST',
				url: `${api}/categories`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'Created') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Nova categoria salva' } });
					store.dispatch('LOAD_CATEGORIES_LIST');
					$('#new-category').modal('hide'); // eslint-disable-line no-undef
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		DELETE_CATEGORY({ commit }, id) {
			axios({
				method: 'DELETE',
				url: `${api}/categories/${id}`,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Categoria excluída' } });
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
		},
		EDIT_CATEGORY({ commit }, data) {
			axios({
				method: 'PUT',
				url: `${api}/categories/${data.id}`,
				data,
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					commit('SET_ALERT_MESSAGE', { res: { message: 'Categoria alterada' } });
					store.dispatch('LOAD_CATEGORIES_LIST');
					$('#new-category').modal('hide'); // eslint-disable-line no-undef
				}
			}, (err) => {
				// eslint-disable-next-line
				console.log(err);
				commit('SET_ALERT_MESSAGE', { res: { message: 'Ocorreu um erro. Tente novamente.' } });
			});
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
		SET_REDIRECT(state, { data }) {
			// eslint-disable-next-line
			state.redirect.state = data.state;
			// eslint-disable-next-line
			state.redirect.path = data.path;
		},
		SET_CONFIRM_MESSAGE(state, { data }) {
			if (data.redirect) {
				// eslint-disable-next-line
				store.dispatch('CHANGE_REDIRECT', data.redirect);
			}
			// eslint-disable-next-line
			state.confirm.message = data.message;
			$('#confirm').modal('show'); // eslint-disable-line no-undef
		},
		SET_CONFIRM_STATE(state, { res }) {
			// eslint-disable-next-line
			state.confirm.state = res;
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
