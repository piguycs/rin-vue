<template>
  <form @submit="updateUserProfile">
    <h1>Update User Details</h1>

    <p>current user: {{ user ? user.uid : "not signed in or loading" }}</p>

    <label for="name">
      <span>Username</span>
      <input type="text" name="name" v-model="username" />
    </label>

    <label for="pfp">
      <span>Profile Picture URL</span>
      <input type="url" name="pfp" />
    </label>

    <input type="submit" value="Submit" />
    
    <NuxtLink href="/login">login page</NuxtLink>
  </form>
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";

const user = ref<User>();


onAuthStateChanged(getAuth(), (e) => {
  user.value = e;
});

const username = ref("");
const pfp = ref("");


async function updateUserProfile(e: Event) {
  e.preventDefault();

  try {
    await updateUser(username.value, pfp.value);

  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  max-width: 40%;
  gap: 1rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;

  input[type="submit"] {
    height: 2rem;
  }

  input[type="text"],
  input[type="url"] {
    height: 1.6rem;
  }

  label {
    display: flex;
    flex-direction: column;
  }
}

img {
  width: 192px;
  aspect-ratio: 1/1;
  border: 4px solid black;
}
</style>
