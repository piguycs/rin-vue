<template>
  <div class="root">
    <div class="form">
      <h1>Sign in to <span class="fancy-text">start chatting</span></h1>
      <form @submit="loginHandler">
        <label class="input">
          <input
            class="input--field"
            type="email"
            placeholder=" "
            v-model="inputEmail"
          />
          <span class="input--label">Email</span>
        </label>
        <label class="input">
          <input
            class="input--field"
            type="text"
            placeholder=" "
            v-model="inputPassword"
          />
          <span class="input--label">Password</span>
        </label>

        <label>
          <input type="submit" class="primary-btn btn" value="Login" />
        </label>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
let inputEmail = ref("");
let inputPassword = ref("");



function loginHandler(e: SubmitEvent) {
  e.preventDefault();

  console.log({
    name: inputEmail.value,
    password: inputPassword.value,
  });
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


.form {
  background-color: $bg-1;
  box-shadow: 0 0 13px lighten($color: $bg-1, $amount: 5);
  color: $fg-1;

  max-height: 70%;
  min-height: 45rem;
  min-width: 45rem;
  max-width: 50%;

  border-radius: 8px;
  padding: 20px;
  display: flex;

  align-items: center;
  flex-direction: column;
  gap: 7rem;

  grid-area: a;

  transition: all 0.5s;

  h1 {
    margin-top: 4rem;
    .fancy-text {
      color: $accent-1;
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    .hidebtn {
      position: absolute;
      left: 21rem;
      cursor: pointer;
      color: $fg-2;
      font-size: 25px;
      top: 8px;
    }

    .btn {
      width: 22rem;
      height: 35px;
      margin-top: 3rem;
    }
  }
}

@media only screen and (max-width: 800px) {
  .form {
    min-width: 100vw;
    min-height: 100vh;
    border-radius: 0;
    padding: 0;
  }
}

@media only screen and (max-height: 47rem) {
  .form {
    min-width: 100vw;
    min-height: 100vh;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
  }

  .root {
    background-image: none;
    background-color: $bg-1;
  }
}
</style>
