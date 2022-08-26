<template>
  <!-- ROOT DIV -->
  <div class="bg-bg-2 h-screen w-screen grid grid-cols-[5.6rem_1fr]">
    <!-- Server list sidebar -->
    <div class="">
      <p class="text-gray-400 px-6 py-1 text-lg font-mono font-semibold">rin</p>
    </div>

    <!-- Main Chat Area -->
    <div
      class="bg-bg-1 rounded-l-xl grid grid-cols-[16rem_1fr] pl-3 pr-4 pt-4 pb-[1.2rem] gap-4"
    >
      <!-- Server sidebar -->
      <div class="bg-bg-2 rounded-xl py-2 px-4 grid grid-rows-[4.2rem_1fr]">
        <h1 class="text-white font-bold text-2xl">{{ server.name }}</h1>
        <div class="overflow-scroll text-white text-xl">
          <div class="h-px my-4">
            <p># channels</p>
            <p
              class="px-2 py-[4px] hover:bg-bg-3 cursor-pointer mt-1 rounded-lg"
              v-for="channels in server.channels"
            >
              {{ channels }}
            </p>

            <p class="mt-4 font-mono">members</p>
            <p
              class="overflow-x-hidden"
              v-for="member in server.members"
              :id="member.uid"
            >
              {{ member.uid }}
            </p>
          </div>
        </div>
        <div
          v-if="user"
          class="grid grid-flow-col h-min items-center grid-cols-[2.5rem_1fr] gap-4"
        >
          <img :src="user.photoURL" alt="pfp" class="rounded-full h-11" />
          <div class="grid gap-0">
            <p class="text-white font-normal text-xl leading-5">
              {{ user.displayName }}
            </p>
            <p class="text-gray-400 font-normal text-base">early alpha user</p>
          </div>
        </div>
        <div v-else="user" class="text-gray-400 font-normal text-base">
          loading user...
        </div>
      </div>

      <!-- Server chat history -->
      <div class="grid grid-rows-[1fr_3.4rem]">
        <div></div>
        <form action="" onsubmit="submit"></form>
        <div class="bg-bg-2 rounded-xl h-[3.2rem]">Hello</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";

const server = ref({
  name: "Rin Development Room",
  channels: [
    "general",
    "chatting",
    "dying",
    "graveyard",
    "bots",
    "rules",
    "faq",
  ],
  members: [
    {
      perms: 0,
      uid: "SgKGQV92TDUTIXcFGAmgFP481s43",
    },
  ],
  perms: {
    0: {
      colour: "#ff7070",
    },
  },
});

function submit(e) {
  e.preventDefault();
}

const user = ref<null | User>(null);

onMounted(() => {
  for (let count = 0; count < server.value.members.length; count++) {
    const member = server.value.members[count];
    const uid = document.getElementById(member.uid);

    $fetch("/api/getuserfromuid", { params: { uid: member.uid } }).then(
      (data) => {
        uid.innerText = data.name || "unknown";
      }
    );
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (e) => {
    user.value = e;
  });
});
</script>

<style lang="scss" scoped></style>
