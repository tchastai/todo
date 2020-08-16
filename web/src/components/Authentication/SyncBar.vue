<template>
  <div class="syncbar">
    <p v-if="isAlive && isLoggedIn" class="sync-information">
      <Loader v-if="isSynchronizing" />
      {{ isSynchronizing ? 'Synchronizing' : 'Synchronized' }}
    </p>
    <div v-if="!isAlive" class="offline-label">
      <Offline />
      <p>Server is offline</p>
    </div>
    <p v-if="!isLoggedIn && isAlive" @click="toggleSignInForm" class="link-button auth-button">
      Sign In
    </p>
    <p v-if="isLoggedIn && isAlive" @click="logOut" class="link-button auth-button">
      Log Out
    </p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Offline from '../../assets/icons/Offline.vue';
import Loader from '../Shared/Loader.vue';

const { mapMutations, mapState: mapAuthenticationState, mapActions } = createNamespacedHelpers(
  'authentication',
);
const { mapState: mapServerState } = createNamespacedHelpers('server');
const { mapState: mapListsState } = createNamespacedHelpers('lists');

export default {
  name: 'SyncBar',
  components: {
    Offline,
    Loader,
  },
  computed: {
    ...mapAuthenticationState(['isLoggedIn']),
    ...mapServerState(['isAlive']),
    ...mapListsState(['isSynchronizing', 'lastSynchronization']),
  },
  methods: {
    ...mapMutations(['toggleSignInForm']),
    ...mapActions(['logOut']),
  },
};
</script>
<style>
.syncbar p {
  font-weight: 600;
  font-size: 14px;
}
.syncbar {
  position: fixed;
  bottom: 24px;
  right: 24px;
  height: 40px;
  display: flex;
  align-items: center;
}

.syncbar > * {
  padding-right: 8px;
  padding-left: 8px;
  height: 16px;
}

.syncbar > * + * {
  border-left: 1px solid #ebeffc;
}

.link-button {
  cursor: pointer;
  transition: filter cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.link-button:hover {
  filter: brightness(0.7);
}

.auth-button {
  color: #0054ff;
}

.offline-label {
  color: #ff3950;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: wait;
}

.offline-label > p {
  margin-left: 6px;
}

.sync-information {
  font-weight: normal;
  font-size: 14px;
  color: #cacaca;
  display: flex;
}

.sync-information .loading-spinner {
  margin-right: 8px;
}

.sync-information .loading-spinner div {
  background-color: #cacaca;
}
</style>
