<template>
  <div class="grid grid-cols-[5.6rem_1fr] bg-bg-2 h-screen">
    <div class="">

    </div>
    <div class="bg-bg-1 rounded-l-[20px] grid grid-cols-[17.5rem_1fr]">
      <div class="bg-bg-1 px-4 py-4 grid place-items-center">
        <div class="bg-bg-2 h-full w-full"></div>
        
      </div>
      <form class="" v-on:submit="submit">
        <input
          type="text"
          class="msginpt"
          placeholder="Send a message"
          maxlength="512"
          v-on:submit="submit"
        />
        <input type="submit" class="" value="SEND" />
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
function submit(e: Event) {
  e.preventDefault();
}
</script>

<style lang="scss" scoped>
</style>
