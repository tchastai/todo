<template>
  <div class="form-error">
    <Warning class="icon" />
    <span><slot></slot></span>
  </div>
</template>

<script>
import Warning from '../../assets/icons/Warning.vue';

export default {
  name: 'Card',
  components: {
    Warning,
  },
};
</script>
<style scoped>
.form-error {
  background: #ffecec;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  margin-top: 24px;
  box-sizing: border-box;
}

.form-error span {
  font-weight: 600;
  font-size: 14px;
  color: #ff6666;
}

.form-error .icon {
  margin-right: 8px;
}
</style>
