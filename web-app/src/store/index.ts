import Vuex from 'vuex';
import Vue from 'vue';
import dataset from '@/store/modules/dataset.state';
import annotation from '@/store/modules/annotation.state';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { dataset, annotation },
});
