<template>
  <div class="chatroot" :class="sideBarFull ? 'full' : 'compact'">
    <Sidebar
      :full="sideBarFull"
    />
    <div class="chat">
      <span>{{ sideBarFull }}</span>
      <input class="message-box" placeholder="Send a message" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const sideBarFull = ref(true);
</script>

<style lang="scss" scoped>
.chatroot {
  color: $fg-1;
  background-color: $bg-1;

  display: grid;
  grid-template-areas: "a b";
  height: 100vh;
}

.full {
  grid-template-columns: 17rem 1fr;
}
.compact {
  grid-template-columns: 8rem 1fr;
}

.chat {
  display: grid;
  grid-template-rows: 1fr 48px;
  margin: 17px 20px 12px 0px;
}

.message-box {
  background-color: $bg-2;
  border-radius: 10px;
  padding: 12px;
  outline: 0;
  border: 0;
  color: $fg-1;
  font-size: 18px;
}

</style>
