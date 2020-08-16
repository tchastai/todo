import SDK, { HealthStatus } from '../../api/SDK';
import { ActionContext } from 'vuex';

interface ServerState {
  isAlive?: boolean;
}

const client = SDK.getClient();

const state = {
  isAlive: false,
};

const mutations = {
  setServerAlive(state: ServerState, isAlive: boolean) {
    state.isAlive = isAlive;
  },
};

const actions = {
  async checkHealth(context: ActionContext<any, any>) {
    const healthStatus = await client.getHealth();
    if (healthStatus === HealthStatus.PASS) {
      context.commit('setServerAlive', true);
    } else if (healthStatus === HealthStatus.DOWN) {
      context.commit('setServerAlive', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
