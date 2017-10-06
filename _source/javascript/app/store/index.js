/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */

import Vue from 'vue';
import Vuex from 'vuex';

// Load modules
import auth from './modules/auth';
import assets from './modules/assets';
import categories from './modules/categories';
import complaints from './modules/complaints';
import enterprises from './modules/enterprises';
import notifications from './modules/notifications';
import surveys from './modules/surveys';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth,
		assets,
		categories,
		complaints,
		enterprises,
		notifications,
		surveys,
	},
	state: {
		// Utilities
		alertMessage: '',
		confirm: {
			message: '',
			state: false,
		},
		redirect: {
			state: false,
			path: '',
		},
		// Fundamental for all requests
		selectedEnterprise: '',
	},
	actions: {
		// Utilities
		CHANGE_ALERT_MESSAGE({ commit }, message) {
			commit('SET_ALERT_MESSAGE', { res: { message } });
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
		// Fundamental for all requests
		CHANGE_SELECTED_ENTERPRISE({ commit }, id) {
			commit('SET_SELECTED_ENTERPRISE', { id });
		},
	},
	mutations: {
		// Utilities
		SET_ALERT_MESSAGE(state, { res }) {
			if (res.redirect) {
				state.redirect.state = res.redirect.state;

				state.redirect.path = res.redirect.path;
			}
			state.alertMessage = res.message;
			$('#alert').modal('show');
		},
		SET_REDIRECT(state, { data }) {
			state.redirect.state = data.state;
			state.redirect.path = data.path;
		},
		SET_CONFIRM_MESSAGE(state, { data }) {
			if (data.redirect) {
				store.dispatch('CHANGE_REDIRECT', data.redirect);
			}
			state.confirm.message = data.message;
			$('#confirm').modal('show');
		},
		SET_CONFIRM_STATE(state, { res }) {
			state.confirm.state = res;
		},
		// Fundamental for all requests
		SET_SELECTED_ENTERPRISE(state, { id }) {
			state.selectedEnterprise = id;
		},
	},
});

export default store;
