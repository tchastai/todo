<template>
  <div class="loading-spinner">
    <div />
    <div />
    <div />
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>
<style>
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
