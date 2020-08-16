import Vue from 'vue';
import Vuex from 'vuex';

import lists from './modules/lists';
import server from './modules/server';
import authentication from './modules/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lists,
    server,
    authentication,
  },
});
