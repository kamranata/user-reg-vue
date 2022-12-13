<template>
  <v-app>
    <v-main>
      <UserRegister/>
    </v-main>
  </v-app>
</template>

<script>
import UserRegister from './components/UserRegister';

export default {
  name: 'App',

  components: {
    UserRegister,
  },

  data: () => ({
    //
  }),
};
</script>
