import Vue from 'vue';
import VueMaterial from 'vue-material';

import App from './App.vue';
import store from './store';

import 'vue-material/dist/vue-material.min.css';
import 'es6-promise/auto';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
