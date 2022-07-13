<template>
  <div class="sidebar--full">
    <SupportBtn />

    <div>
      <Rooms :roomList="roomList" />
    </div>

    <Profile />
  </div>
</template>

<script lang="ts" setup>
const roomList = ref(["Party", "Study", "🤪 HIP"]);
</script>

<style lang="scss">
.sidebar {
  background-color: $bg-2;

  /* Grids */
  display: grid;
  grid-template-areas:
    "top"
    "rooms"
    "profile";
  grid-template-rows: 3rem 1fr 1.4rem;

  &--full {
    @extend .sidebar;
    box-shadow: 0px 0px 16px $bg-2;
    margin: 17px 20px 12px;
    border-radius: 12px;
    padding: 12px;
  }
}



</style>
