<template>
  <div
    class="absolute top-0 w-screen h-screen overflow-hidden bg-opacity-80 bg-black grid place-items-center"
  >
    <div
      class="w-[45%] h-[50%] bg-bg-1 rounded-xl p-6 grid grid-rows-[auto_1fr_auto]"
    >
      <h1 class="text-white font-bold text-3xl">Join the main chat room</h1>
      <p class="text-white text-xl font-medium my-4">adding new servers is wip</p>

      <div class="grid grid-cols-2 gap-6">
        <button
          v-on:click="$emit('join')"
          class="bg-accent-1 px-6 py-2 text-white rounded-md font-bold"
        >
          Join
        </button>

        <button
          class="bg-accent-3 px-6 py-2 text-white rounded-md font-bold"
          v-on:click="$emit('cancle')"
        >
          Cancle
        </button>
      </div>
    </div>
  </div>
</template>
