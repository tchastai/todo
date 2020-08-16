<template>
  <div class="checkbox" :class="{ active }" v-on:click="$emit('checkTask')">
    <CheckmarkIcon class="checkmark-icon" />
  </div>
</template>

<script lang="ts">
import CheckmarkIcon from '../../assets/icons/Checkmark.vue';

export default {
  name: 'Checkbox',
  components: {
    CheckmarkIcon,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #dfe5f4;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: default;

  transition: background-color cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.checkbox:hover:not(.active) {
  background-color: #f2f5ff;
}

.active {
  background-color: #0054ff;
  border-color: #0054ff;
}

.checkmark-icon {
  transform: scale(0.1);
  opacity: 0;
  transition: all cubic-bezier(0, 0, 0.2, 1) 0.3s;
}

.active > .checkmark-icon {
  opacity: 1;
  transform: scale(1);
}
</style>
