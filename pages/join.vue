<template>
  <div class="root">
    <!-- Invite Code -->
    <Form v-bind="formInvite" v-if="showInptForm && !showLoad.load" />
    <!-- Username -->
    <Form v-bind="formUsername" v-else-if="showUnameForm && !showLoad.load" />
    <!-- Email/Password -->
    <Form v-bind="formEmailPassword" v-else-if="!showLoad.load" />

    <!-- Loading screen -->
    <Load v-if="showLoad.load" />
  </div>
</template>

<script lang="ts" setup>
const showInptForm = ref(true);
const showUnameForm = ref(false);
const showLoad = ref({
  load: false,
  error: false,
});

// INVITE CODE CHECK FORM
const inviteCode = ref("");
async function checkCode(e: Event) {
  e.preventDefault();

  showLoad.value.load = true;
  const res = await $fetch("/api/checkcode", {
    params: { code: inviteCode.value },
  });
  showLoad.value.load = false;

  if (res.valid) {
    showInptForm.value = false;
    showUnameForm.value = true;
  } else {
    alert("Invite Code is invalid");
  }
}
const formInvite = {
  headingNormal: "Join now to ",
  headingHighlight: "start connecting",
  inputs: [
    {
      ref: inviteCode,
      name: "Invite Code",
    },
  ],
  submitText: "Check code",
  spacer: 3.6,
  submitEvent: checkCode,
};

const username = ref("");
async function checkUsername(e: Event) {
  e.preventDefault();

  showLoad.value.load = true;
  const res = await $fetch("/api/checkuser", {
    params: { name: username.value },
  });
  showLoad.value.load = false;

  if (res.valid) {
    showUnameForm.value = false;
  } else {
    alert("Username already taken or is invalid");
  }
}
const formUsername = {
  headingNormal: "Join now to ",
  headingHighlight: "start connecting",
  inputs: [
    {
      ref: username,
      name: "Username",
      type: "default",
    },
  ],
  spacer: 3.6,
  submitText: "Next",
  submitEvent: checkUsername,
};

const inputEmail = ref("");
const inputPassword = ref("");
async function joinHandler(e) {
  e.preventDefault();

  showLoad.value.load = true;
  const res = await $fetch("/api/createuser", {
    body: {
      email: inputEmail.value,
      password: inputPassword.value,
      username: username.value,
      code: inviteCode.value,
    },
    method: "POST",
  });
  showLoad.value.load = false;
  if (res.success) {
    await signInUser(inputEmail.value, inputPassword.value);
    useRouter().push("/login");
  } else {
    alert(res.error);
  }

  // console.log(res);
}
const formEmailPassword = {
  headingNormal: "Join now to",
  headingHighlight: "start connecting",
  inputs: [
    {
      ref: inputEmail,
      name: "Email",
      type: "email",
    },
    {
      ref: inputPassword,
      name: "Password",
      type: "password",
    },
  ],
  submitText: "Join",
  submitEvent: joinHandler,
};
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
