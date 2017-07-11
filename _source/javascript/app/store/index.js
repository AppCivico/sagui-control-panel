import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		enterprises: [],
		enterprise: {},
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
		LOAD_ENTERPRISE({ commit }) {
			axios.get('http://localhost:3000/enterprises/1').then((response) => {
				commit('SET_ENTERPRISES_LIST', { res: response.data });
				console.log(response.data);
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
	},
	getters: {
	},
});

export default store;
