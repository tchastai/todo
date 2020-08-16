<template>
  <div class="button">
    <slot v-if="!loading"></slot>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import Loader from './Loader';

export default {
  name: 'Button',
  props: {
    loading: Boolean,
  },
  components: {
    Loader,
  },
};
</script>
<style scoped>
.button {
  height: 40px;
  background: #0054ff;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-top: 24px;

  transition: 0.1s ease;
}

.button:hover {
  filter: brightness(1.4);

  box-shadow: 0px 2px 8px rgba(51, 61, 82, 0.16);
}

.button:active {
  filter: brightness(0.9);
  transition: unset;
  box-shadow: unset;
}

.loading-spinner {
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.loading-spinner div {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: white;
  animation-name: load;
  animation-duration: 0.9s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  transform: translateY(-4px);
}

.loading-spinner :nth-child(2) {
  animation-delay: 0.3s;
}

.loading-spinner :nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes load {
  from {
    opacity: 1;
    transform: translateY(-4px);
  }

  50% {
    opacity: 0.4;
  }

  to {
    opacity: 1;
    transform: translateY(4px);
  }
}
</style>
