import { ActionContext } from 'vuex';

import SDK, { InvalidCredentialsError, UserAlreadyExistsError } from '../../api/SDK';

interface AuthenticationState {
  isLoggedIn?: boolean;
  error?: string;
  ui: {
    toggleSignInForm: boolean;
    toggleSignUpForm: boolean;
  };
}

const client = SDK.getClient();

const state = {
  error: undefined,
  isLoggedIn: !!localStorage.getItem('sessionToken'),
  ui: {
    toggleSignInForm: false,
    toggleSignUpForm: false,
  },
};

const mutations = {
  completeSignUp(state: AuthenticationState) {
    state.error = undefined;
    state.ui.toggleSignInForm = true;
    state.ui.toggleSignUpForm = false;
  },
  completeSignIn(state: AuthenticationState) {
    state.error = undefined;
    state.isLoggedIn = true;
    state.ui.toggleSignInForm = false;
  },
  setError(state: AuthenticationState, message: string) {
    state.error = message;
  },
  toggleSignInForm(state: AuthenticationState) {
    state.error = undefined;
    state.ui.toggleSignInForm = !state.ui.toggleSignInForm;
  },
  toggleSignUpForm(state: AuthenticationState) {
    state.error = undefined;
    state.ui.toggleSignUpForm = !state.ui.toggleSignUpForm;
  },
  closeForms(state: AuthenticationState) {
    state.ui.toggleSignInForm = false;
    state.ui.toggleSignUpForm = false;
  },
  logOut(state: AuthenticationState) {
    state.isLoggedIn = undefined;
    localStorage.removeItem('sessionToken');
  },
};

const actions = {
  swapAuthForm(context: ActionContext<any, any>) {
    context.commit('toggleSignInForm');
    context.commit('toggleSignUpForm');
  },
  logOut(context: ActionContext<any, any>) {
    context.commit('logOut');
    context.dispatch('lists/emptyLists', {}, { root: true });
  },
  async authenticate(
    context: ActionContext<any, any>,
    { email, password }: { email: string; password: string },
  ) {
    try {
      await client.authenticate(email, password);
      context.commit('completeSignIn');
      context.dispatch('lists/syncListsOnSignIn', {}, { root: true });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        context.commit('setError', error.message);
      }
    }
  },
  async createUser(
    context: ActionContext<any, any>,
    { email, password }: { email: string; password: string },
  ) {
    try {
      await client.createUser(email, password);
      context.commit('completeSignUp');
    } catch (error) {
      if (error) {
        context.commit('setError', error.message);
      }
    }
  },
};

export default {
  namespaced: true,
  mutations,
  state,
  actions,
};
