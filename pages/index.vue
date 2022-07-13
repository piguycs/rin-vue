<template>
  <main>
    <nav>
      <div class="img">Rin</div>
      <span class="navigations">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/" :class="'notin'">Pricing</NuxtLink>
        <NuxtLink to="/" class="notin">Join</NuxtLink>
        <NuxtLink to="/chat" v-if="user" class="open-app">Open App</NuxtLink>
        <NuxtLink to="/login" v-else class="notin">Login</NuxtLink>
      </span>
    </nav>
  </main>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  background: rgb(19, 20, 32);
  padding-left: 12rem;
  padding-right: 12rem;
}

nav {
  padding-top: 12px;
  height: 50px;
  color: hsl(0, 0%, 100%);
  user-select: none;
  display: grid;
  justify-content: space-between;
  grid-template-areas: "a b";

  .img {
    font-family: "Roboto";
    font-weight: 300;
    font-size: 35px;
    color: hsl(180, 98%, 83%);
    display: grid;
    place-items: center;
  }
  .navigations {
    display: flex;
    place-items: center;

    a {
      margin-left: 10px;
      margin-right: 10px;
      text-decoration: none;
      color: hsl(208, 100%, 97%);
      font-family: "Roboto";
      font-weight: 500;
      font-size: 20px;
      &.notin {
        color: hsl(204, 18%, 65%);
        &:hover {
          color: hsl(208, 100%, 97%);
        }
      }
      &.open-app {
        color: $fg-1;
        background-color: $accent-1;
        box-shadow: 0px 0px 8px $accent-1;
        font-family: 'Cantarell';
        font-weight: 600;
        font-size: 16px;
        padding: 8px 14px;
        border-radius: 22px;
      }
    }
  }
}
</style>
