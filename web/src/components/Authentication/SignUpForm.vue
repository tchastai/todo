<template>
  <Card class="signup-card">
    <Title>Welcome.</Title>
    <BodyText>Already have an account?</BodyText>
    <TextLink v-on:click.native="swapAuthForm">Sign In</TextLink>
    <Form>
      <FormError v-if="error">{{ error }}</FormError>
      <FormField label="email">
        <TextInput v-model="email" type="email" />
      </FormField>
      <FormField label="password">
        <TextInput v-model="password" type="password" />
      </FormField>
      <Button v-on:click.native="createUser(email, password)" :loading="loading">Sign Up</Button>
    </Form>
  </Card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Card from '../Shared/Card.vue';
import Title from '../Shared/Title.vue';
import BodyText from '../Shared/BodyText.vue';
import TextLink from '../Shared/TextLink.vue';
import TextInput from '../Shared/TextInput.vue';
import FormField from '../Shared/FormField.vue';
import Form from '../Shared/Form.vue';
import Button from '../Shared/Button.vue';
import FormError from '../Shared/FormError.vue';

const { mapState, mapActions } = createNamespacedHelpers('authentication');

export default {
  name: 'SignUpForm',
  components: {
    Card,
    Title,
    BodyText,
    TextLink,
    TextInput,
    FormField,
    Form,
    Button,
    FormError,
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    };
  },
  computed: {
    ...mapState(['error']),
  },
  methods: {
    ...mapActions(['swapAuthForm']),
    async createUser(email, password) {
      this.loading = true;
      await this.$store.dispatch('authentication/createUser', { email, password });
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.signup-card {
  position: absolute;
  width: 400px;
}
</style>
