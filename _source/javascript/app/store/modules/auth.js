/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console, no-shadow */

import axios from 'axios';
import Vue from 'vue';
import config from '../../config';

const state = {
	apiKey: '',
	user: {},
	authorization: false,
};

// actions
const actions = {
	AUTHENTICATION({ commit }, user) {
		axios({
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			url: `${config.api}/auth/signin`,
			data: user,
		})
		.then((response) => {
			commit('SET_USER', { user: response.data });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('failed-login') } }, { root: true });
		});
	},
	SIGNOUT({ commit }) {
		commit('CLEAR_USER');
	},
	EDIT_APIKEY({ commit }, apiKey) {
		commit('SET_APIKEY', { apiKey });
	},
	LOAD_USER({ commit, state }) {
		axios.get(`${config.api}/user-profile?api_key=${state.apiKey}`).then((response) => {
			commit('SET_USER', { user: response.data });
		}, (err) => {
			console.error(err);
			commit('SET_ALERT_MESSAGE', { res: { message: Vue.i18n.translate('request-error') } }, { root: true });
		});
	},
};

// mutations
const mutations = {
	SET_USER(state, { user }) {
		const apiKey = sessionStorage.getItem('api-key');
		state.user = user;

		if (!apiKey) {
			sessionStorage.setItem('api-key', user.api_key);
		} else {
			state.apiKey = apiKey;
		}
		if (user.api_key) {
			state.apiKey = user.api_key;
		}
		if (user.roles[0] === 'admin') {
			state.authorization = true;
		}
	},
	SET_APIKEY(state, { apiKey }) {
		state.apiKey = apiKey;
	},
	CLEAR_USER(state) {
		state.user = {};
		state.authorization = false;
	},
};

export default {
	state,
	actions,
	mutations,
};
