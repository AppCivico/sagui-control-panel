import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		alertMessage: 'nana',
		enterprises: [],
		enterprise: {},
		surveys: [],
		survey: {},
	},
	actions: {
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
		CHANGE_ALERT_MESSAGE({ commit }, message) {
			commit('SET_ALERT_MESSAGE', { res: message });
		},
		LOAD_SURVEYS_LIST({ commit }) {
			axios.get('http://localhost:3000/surveys').then((response) => {
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
	},
	mutations: {
		SET_ENTERPRISES_LIST(state, { list }) {
			// eslint-disable-next-line
			state.enterprises = list;
		},
		SET_ENTERPRISE(state, { res }) {
			// eslint-disable-next-line
			state.enterprise = res;
		},
		SET_ALERT_MESSAGE(state, { res }) {
			// eslint-disable-next-line
			state.alertMessage = res;
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
