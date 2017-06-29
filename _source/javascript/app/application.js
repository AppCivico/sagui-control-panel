//Required files for AdminLTE theme
//Import jQuery
window.jQuery = require('../../../node_modules/jquery/dist/jquery');
window.$ = window.jQuery;
//Import Bootstrap
const bootstrap = require('../../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');
//Import AdminLTE js file
const adminlte = require('../../../node_modules/admin-lte/dist/js/app');

// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App)
})

console.log('foi')
