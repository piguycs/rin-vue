<template>
  <!-- SVG LOADERS FROM https://samherbert.net/svg-loaders/ -->
  <div class="form">
    <img class="loader" src="assets/puff.svg" alt="loading">
  </div>
</template>

<script lang="ts" setup>
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

img.loader {
  aspect-ratio: 1/1;
  height: 14%;
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
  display: grid;
  place-items: center;


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
</style>
