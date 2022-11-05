<template>
  <div class="root">
    <Form v-bind="formData" />
    <div
      id="notif"
      class="absolute top-2 grid place-items-center w-screen invisible"
    >
      <div
        class="bg-red-500 text-white font-bold px-6 py-3 w-36 rounded-md shadow-xl"
      >
        User updated
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "@firebase/auth";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { initializeApp, getApps } from "@firebase/app";

const user = ref<User | null>(null);

const username = ref("");
const pfp = ref("");

async function updateUserProfile(e: Event) {
  e.preventDefault();

  try {
    await updateUser(username.value, pfp.value);
    console.log(username.value, pfp.value);

    const notif = document.getElementById("notif")!;

    notif.style.visibility = "visible";

    setTimeout(() => {
      notif.style.visibility = "hidden";
    }, 2000);
  } catch (e) {
    console.error(e);
  }
}

const formData = {
  headingNormal: "Update your profile",
  headingHighlight: "",
  inputs: [
    {
      ref: username,
      name: "Username",
      type: "text",
    },
    {
      ref: pfp,
      name: "Photo URL",
      type: "text",
    },
  ],
  submitText: "Update",
  submitEvent: updateUserProfile,
};

onMounted(() => {
  if (getApps().length === 0) {
    const config = useRuntimeConfig();
    // console.log("Firebase app not found, initialising it now");
    initializeApp({
      apiKey: config.APIKEY,
    });
  }

  const auth = getAuth();

  user.value = auth.currentUser;
  onAuthStateChanged(auth, (e) => {
    user.value = e;
  });
});
</script>

<style lang="scss" scoped>
.root {
  background-image: url("assets/stacked-peaks-haikei.svg");
  background-size: cover;

  height: 100vh;

  display: grid;
  place-items: center;
  grid-template-areas: "o a b";
}
</style>
