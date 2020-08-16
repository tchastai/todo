<template>
  <div v-if="ui.toggleSignInForm || ui.toggleSignUpForm" class="authentication-view">
    <div class="backdrop" @click="closeForms" />
    <SignInForm v-if="ui.toggleSignInForm" />
    <SignUpForm v-if="ui.toggleSignUpForm" />
  </div>
</template>

<script>
import { createNamespacedHelpers, mapActions } from 'vuex';

import SignInForm from './SignInForm.vue';
import SignUpForm from './SignUpForm.vue';

const { mapState, mapMutations } = createNamespacedHelpers('authentication');

export default {
  name: 'AuthenticationView',
  components: {
    SignInForm,
    SignUpForm,
  },
  computed: {
    ...mapState(['ui']),
  },
  methods: mapMutations(['closeForms']),
};
</script>
<style scoped>
.authentication-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
}
</style>
