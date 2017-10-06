import Vue from 'vue';
import Vuex from 'vuex';

import vuexI18n from 'vuex-i18n';

// The translation file could also be loaded from a separate json file
// I won't do this for now to prevent an extra ajax call
import ptBr from './ptBR';

// initialize the vuex translations using the vuex module
const translations = new Vuex.Store();

// initialize the internationalization plugin on the vue instance
Vue.use(vuexI18n.plugin, translations);

// add translations directly to the application
Vue.i18n.add('pt-BR', ptBr);

// set the start locale to use
Vue.i18n.set('pt-BR');
