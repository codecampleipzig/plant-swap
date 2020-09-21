<template>
  <div>
    <h1>Home</h1>
    <p>Logged in as {{ $store.state.user.email }}</p>
    <form @submit.prevent="submit">
      <img v-if="imgPreviewUrl" :src="imgPreviewUrl" alt="" />
      <input
        type="file"
        name="image"
        id="image"
        ref="fileInput"
        @input="fileSelected"
      />
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        v-model="plant.name"
      />
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        placeholder="Your description..."
        v-model="plant.description"
      ></textarea>
      <input type="submit" value="Post Plant" />
    </form>
    <div>{{ $store.state.plants }}</div>
    <div v-for="plant in $store.state.plants" :key="plant.id">
      <img :src="plant.img" alt="" />
      <h2>{{ plant.name }}</h2>
      <p>{{ plant.description }}</p>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { auth, db, storage } from "@/firebase";

export default {
  data() {
    return {
      plant: {
        img: "",
        name: "",
        description: ""
      },
      imgPreviewUrl: ""
    };
  },
  methods: {
    async logout() {
      await auth.signOut();
      this.$router.push("/auth/signin");
    },
    async submit() {
      const imgFile = this.$refs.fileInput.files[0];
      if (!imgFile) return;

      const storageRef = storage.ref();
      const snapshot = await storageRef
        .child(`${this.$store.state.user.uid}${imgFile.name}`)
        .put(imgFile, { user: this.$store.state.user.uid });

      const downloadUrl = await snapshot.ref.getDownloadURL();

      db.collection("plants").add({
        ...this.plant,
        img: downloadUrl,
        userId: this.$store.state.user.uid,
        userEmail: this.$store.state.user.email
      });
    },
    fileSelected() {
      const imgFile = this.$refs.fileInput.files[0];
      if (!imgFile) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);

      fileReader.addEventListener("loadend", () => {
        this.imgPreviewUrl = fileReader.result;
      });
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
}
</style>
