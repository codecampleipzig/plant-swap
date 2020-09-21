<template>
  <div class="home">
    <router-link to="/auth/signin">Sign in</router-link>
    <router-link :to="{ name: 'Auth', params: { mode: 'signup' } }"
      >Sign up</router-link
    >
    <form @submit.prevent="submit">
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        v-model="email"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
      />
      <input type="submit" :value="modeTitle" />
    </form>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      if (this.mode == "signin") {
        await auth.signInWithEmailAndPassword(this.email, this.password);
      } else {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
      }
      this.$router.push("/");
    }
  },
  computed: {
    mode() {
      // 'signin' 'signup'
      return this.$route.params.mode;
    },
    modeTitle() {
      // 'Sign in' 'Sign up'
      return this.mode == "signin" ? "Sign in" : "Sign up";
    }
  }
};
</script>
