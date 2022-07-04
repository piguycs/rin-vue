<template>
  <div class="root">
    <!-- Login Form -->
    <div class="form" v-if="!options.isLoggedIn">
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
            type="password"
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
    <!-- Show the profile -->
    <div class="form loggedin" v-else-if="options.profile.username">
      <span>Signed in as</span>
      <img :src="options.profile.avatar_url" alt="pfp" />
      <h1>{{ options.profile.username }}</h1>
      <button class="primary-btn btn2" @click="proceed()">
        Proceed to the app
      </button>
      <button class="primary-btn btn2 bottom-element" @click="logout()">
        Sign Out
      </button>
    </div>
    <!-- Disabled -->
    <div class="form loggedin" v-else>
      <span>Signed in as</span>
      <img class="disabled" :src="options.profile.avatar_url" />
      <h1>Loading...</h1>
      <button class="primary-btn btn2" disabled>Proceed to the app</button>
      <button class="primary-btn btn2 bottom-element" disabled>Sign Out</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

interface opt {
  isLoggedIn: boolean;
  profile: any;
}
let options: opt = reactive({
  isLoggedIn: false,
  profile: "",
});

watchEffect(async () => {
  if (user.value) {
    options.isLoggedIn = true;
    const id = user.value.id;
    options.profile = (
      await $fetch("/api/profile", { params: { id } })
    ).profile;
  } else {
    options.isLoggedIn = false;
  }
});

let inputEmail = ref("");
let inputPassword = ref("");

function proceed() {
  router.push("/chat");
}

async function login(email: string, password: string) {
  const { error } = await client.auth.signIn({ email, password });

  if (error) {
    throw error;
  }
}

async function logout() {
  try {
    await client.auth.signOut();
  } catch (e) {
    console.error(e);
  }
}

async function loginHandler(e: SubmitEvent) {
  e.preventDefault();

  let email = inputEmail.value;
  let password = inputPassword.value;

  try {
    await login(email, password);
  } catch (e) {
    console.error(e);

    alert(e.message);
  }
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
.loggedin {
  display: flex;
  gap: 0;

  span {
    margin: 0;
    margin-bottom: 12px;
    font-size: 22px;
    font-weight: 600;
  }
  img {
    width: 256px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin: 1rem;
    border-spacing: 10px;
    padding: 8px;
    border: 10px solid $accent-light;
  }
  img.disabled {
    border: 10px solid hsl(0, 0%, 34%);
  }
  h1 {
    margin-top: 2rem;
  }
  .btn2 {
    margin-top: auto;
    height: 40px;
    border-radius: 4px;
    width: 50%;
  }
  .bottom-element {
    margin-bottom: 8rem;
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
