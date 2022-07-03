<template>
  <div class="container">
    <span>
      Start connecting on <NuxtLink class="link" to="/chat">Rin</NuxtLink>
    </span>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-items: center;
  height: 100vh;
  font-weight: 700;
  font-size: 50px;
}
.link {
  color: blue;
}
</style>
