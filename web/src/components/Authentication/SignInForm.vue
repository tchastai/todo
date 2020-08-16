<template>
  <Card class="login-card">
    <Title>{{ title }}</Title>
    <BodyText>New here?</BodyText>
    <TextLink v-on:click.native="swapAuthForm">Create an account</TextLink>
    <Form>
      <FormError v-if="error">{{ error }}</FormError>
      <FormField label="email">
        <TextInput v-model="email" type="email" />
      </FormField>
      <FormField label="password">
        <TextInput v-model="password" type="password" />
      </FormField>
      <Button v-on:click.native="authenticate(email, password)" :loading="loading">Sign In</Button>
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
  name: 'SignInForm',
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
    title() {
      const userName = this.email.split(/@|\.|-/)[0];
      const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
      const welcomeText = 'Welcome back';

      return (capitalizedName ? `${welcomeText}, ${capitalizedName}` : welcomeText) + '.';
    },
    ...mapState(['error']),
  },
  methods: {
    ...mapActions(['swapAuthForm']),
    async authenticate(email, password) {
      this.loading = true;
      await this.$store.dispatch('authentication/authenticate', { email, password });
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.login-card {
  position: absolute;
  width: 400px;
}
</style>
