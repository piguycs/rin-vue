<template>
  <div class="root">
    <div class="infobox">
      <span v-if="!pendingHello">
        {{ datahello.api }}
      </span>
      <span v-else> Logging in </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
  data: datahello,
  pending: pendingHello,
  refresh,
} = await useFetch("/api/hello");
</script>

<style lang="scss">
.root {
  background-image: url("assets/stacked-peaks-haikei.svg");
  background-size: cover;

  height: 100vh;

  display: grid;
  place-items: center;

  color: $fg-1;
}

.infobox {
  background-color: $bg-1;
  height: 25rem;
  width: 40rem;
  border-radius: 12px;
  padding: 12px;
}
</style>
