<template>
  <div class="root">
    
    <!-- Invite Code -->
    <Form v-bind="formEmailPassword" v-if="true" />
    <!-- Username -->
    <Form v-bind="formEmailPassword" v-else-if="false" />
    <!-- Email/Password -->
    <Form v-bind="formEmailPassword" v-else />

  </div>
</template>

<script lang="ts" setup>

const inputEmail = ref("")
const inputPassword = ref("")


async function joinHandler(e) {
  e.preventDefault()
  console.log(inputEmail.value, inputPassword.value)

}

const formUsername = {
  headingNormal: "Join now to ",
  headingHighlight: "start connecting",
  inputs: [
    {
      ref: inputPassword,
      name: "Username"
    }
  ],
  submitText: "Next",
  submitEvent: joinHandler
}

const formEmailPassword = {
  headingNormal: "Join now to ",
  headingHighlight: "start connecting",
  inputs: [
    {
      ref: inputEmail,
      name: "Email",
      type: "email"
    },
    {
      ref: inputPassword,
      name: "Password"
    }
  ],
  submitText: "Join",
  submitEvent: joinHandler
}

const formInvite = {
  headingNormal: "Join now to ",
  headingHighlight: "start connecting",
  inputs: [
    {
      ref: inputEmail,
      name: "Email",
      type: "email"
    },
    {
      ref: inputPassword,
      name: "Password"
    }
  ],
  submitText: "Join",
  submitEvent: joinHandler
}
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