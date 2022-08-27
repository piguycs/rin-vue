<template>
  <div
    class="absolute w-screen h-screen overflow-hidden bg-opacity-80 bg-black grid place-items-center"
  >
    <div
      class="w-[45%] h-[50%] bg-bg-1 rounded-xl p-6 grid grid-rows-[auto_1fr_auto]"
    >
      <h1 class="text-white font-bold text-3xl">OOPS! There is an error...</h1>
      <p class="text-white text-xl font-medium my-4">{{ props.text }}</p>

      <div class="grid grid-cols-2 gap-6">
        <button
          v-on:click="$emit('disable')"
          class="bg-accent-1 px-6 py-2 text-white rounded-md font-bold"
        >
          Ok
        </button>

        <button
          class="bg-accent-3 px-6 py-2 text-white rounded-md font-bold"
        >
          Support (WIP)
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ text: string }>();
</script>
