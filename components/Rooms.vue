<template>
  <div v-for="i in roomList" class="room">
    <span>{{ i }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  roomList:string[]
}>();

const {roomList} = toRefs(props)

</script>

<style lang="scss">
.room {
  user-select: none;
  background-color: $bg-3;
  color: $fg-1;
  border: transparent;
  cursor: pointer;
  outline: none;
  height: 40px;
  margin-bottom: 8px;
  border-radius: 4px;
  display: grid;
  place-items: center;

  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transition: all 0.1s;
    transform: scale(0.95);
  }
}
</style>
