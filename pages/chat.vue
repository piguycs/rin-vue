<template>
  <!-- ROOT DIV -->
  <div class="bg-bg-2 h-screen w-screen grid grid-cols-[5.6rem_1fr] font-sans">
    <!-- Server list sidebar -->
    <div class="grid grid-rows-[34px_1fr]">
      <p class="text-gray-400 px-6 py-1 text-lg font-mono font-semibold">rin</p>
      <ServerListBar @click="addServer" />
    </div>

    <!-- Main Chat Area -->
    <div
      class="bg-bg-1 rounded-l-xl grid lg:grid-cols-[16rem_1fr] pl-6 lg:pl-3 pr-4 pt-4 pb-[1.2rem] gap-4"
    >
      <!-- Server sidebar -->
      <div
        class="bg-bg-2 rounded-xl py-2 px-4 hidden lg:grid grid-rows-[4.2rem_1fr]"
      >
        <h1 class="text-white font-bold text-2xl">{{ server.name }}</h1>
        <div class="overflow-scroll text-white text-xl">
          <div class="h-px my-4">
            <div
              class="text-lg text-bg-text cursor-pointer select-none grid grid-flow-col justify-start gap-2"
            >
              <p class="">
                {{ "祈" }}
              </p>
              channels
            </div>
            <div
              class="px-2 py-[4px] hover:bg-bg-3 text-lg text-bg-text cursor-pointer mt-1 rounded-lg grid grid-flow-col justify-start gap-2"
              v-for="channel in server.channels"
              :class="channel === 'general' ? 'bg-bg-3' : ''"
            >
              <p class="text-3xl leading-8 select-none"></p>
              <p>
                {{ channel }}
              </p>
            </div>

            <p
              class="mt-4 text-bg-text font-sans text-lg cursor-pointer select-none"
            >
              祈 members
            </p>
            <p
              class="overflow-x-hidden px-2 py-[4px] hover:bg-bg-3 text-lg text-bg-text cursor-pointer mt-1 rounded-lg grid grid-flow-col justify-start gap-3"
              v-for="member in server.members"
              :id="member.uid"
            >
              {{ member.uid + "r/w" }}
            </p>
          </div>
        </div>
        <div class="flex gap-2 w-full">
          <button
            v-for="x in nameColour.list"
            v-on:click="() => (nameColour.current = nameColour.list.indexOf(x))"
            class="bg-bg-3 mb-4 py-1 w-full rounded-lg hover:text-fg-1 text-2xl"
            :style="`color: ${nameColour.list[nameColour.list.indexOf(x)]}`"
          >
            ●
          </button>
        </div>
        <div
          v-if="user"
          class="grid grid-flow-col h-min items-center grid-cols-[2.5rem_1fr] gap-4 cursor-pointer"
        >
          <img :src="user.photoURL!" alt="pfp" class="rounded-full h-11" />
          <div class="grid gap-0">
            <p
              class="font-semibold text-lg leading-5"
              :style="`color: ${nameColour.list[nameColour.current]}`"
            >
              {{ user.displayName }}
            </p>
            <p class="text-gray-400 font-medium text-sm">early alpha user</p>
          </div>
        </div>
        <div v-else="user" class="text-gray-400 font-normal text-base">
          loading user...
        </div>
      </div>

      <!-- Server chat history -->
      <div class="grid grid-rows-[1fr_3.4rem]">
        <div class="overflow-scroll mb-4" id="msgb">
          <div class="h-px" id="msga">
            <div
              v-for="msg in messages"
              class="text-gray-300 mt-5 grid grid-flow-col justify-start gap-3"
              :id="msg.time.nanoseconds"
            >
              <img
                :src="msg.sender.pfp"
                alt="pfp"
                class="h-10 w-10 rounded-full cursor-pointer hover:shadow-xl object-cover"
              />
              <div>
                <b
                  class="text-white cursor-pointer hover:underline"
                  v-if="msg.sender.uid !== user!.uid"
                  >{{ msg.sender ? msg.sender.name : "unknown" }}</b
                >
                <b
                  class="cursor-pointer hover:underline"
                  :style="`color: ${nameColour.list[nameColour.current]}`"
                  v-else
                  >{{ msg.sender ? msg.sender.name : "unknown" }}</b
                >
                <p :id="`msgcontent_${msg.time.nanoseconds}`">
                  {{ msg.content || "something wrong happened, please report" }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <form action="" v-on:submit="submit" class="grid bg-transparent">
          <input
            class="bg-bg-2 rounded-xl h-[3.2rem] text-white p-3 outline-none"
            maxlength="1024"
            :disabled="!permsCurrent.write"
            :placeholder="
              permsCurrent.write ? `Message in general` : 'Not enough perms'
            "
          />
        </form>
      </div>
    </div>
    <JoinServerBox
      v-if="showJoinBox"
      @join="joinServer"
      @cancel="showJoinBox = false"
    />
  </div>

  <!-- server join dialogue -->
</template>

<script lang="ts" setup>
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  limit,
  DocumentData,
} from "@firebase/firestore";

const showJoinBox = ref(false);

const serverID = ref("0");

const pfpList = ref<any>({});

const nameColour = ref({ list: ["#b0f3fc", "#fcb9b0", "#f3fcb0", "#cdfcb0"], current: 0 });

const permsCurrent = ref({ read: false, write: false });
const permsList = ref<{ [key: string]: { read: boolean; write: boolean } }>({});

const { data: serverInfo, error: serverInfoError } = await useFetch(
  "/api/getserverinfo",
  {
    params: {
      serverid: serverID.value,
    },
  }
);

if (serverInfoError.value) {
  console.error(serverInfoError.value);
}

const server = ref<{
  name: string;
  roomid: number;
  channels: string[];
  members: {
    perms: {
      read: boolean;
      write: boolean;
    };
    uid: string;
  }[];
  perms: {
    0: {
      colour: string;
    };
  };
}>({
  name: "Rin Development Room",
  roomid: 0,
  channels: ["general", "we have gaps"],
  members: [],
  perms: {
    0: {
      colour: "#ff7070",
    },
  },
});

const addServer = () => {
  // I now want to add people to the main server here
  showJoinBox.value = true;
};

function joinServer() {
  $fetch("/api/updaterooms", {
    body: {
      uid: uid.value,
    },
    method: "POST",
  });
}

server.value.members = serverInfo.value!.members;

useHead({
  title: `${server.value.name} - Rin chat`,
});

const uid = ref<string>("");

const messages = ref<DocumentData[]>([]);

async function submit(e: any) {
  e.preventDefault();
  const message = e.target[0].value; // copies the value

  if (!uid.value) return; // exit function if user uid isnt loaded
  e.target[0].value = ""; // resets the value

  const db = getFirestore();
  const roomcol = collection(db, `rooms/${server.value.roomid}/messages`);

  await addDoc(roomcol, {
    content: message,
    sender: {
      name: user.value!.displayName,
      pfp: user.value!.photoURL,
      uid: user.value!.uid,
    },
    time: new Date(),
  });
}

const user = ref<null | User>(null);

onMounted(() => {
  for (let count = 0; count < server.value.members.length; count++) {
    const member = server.value.members[count];
    const uidEl = document.getElementById(member.uid)!;

    $fetch("/api/getuserfromuid", { params: { uid: member.uid } }).then(
      (data) => {
        let permsShow: ("r" | "w")[] = [];

        if (member.perms.read) permsShow.push("r");
        if (member.perms.write) permsShow.push("w");

        permsList.value![member.uid] = {
          read: member.perms.read,
          write: member.perms.write,
        };

        uidEl.innerText = `${data.name} (${permsShow})` || "unknown";
        pfpList[member.uid] = data.pfp;
      }
    );
  }

  watchEffect(
    () => {
      // console.log(messages.value);
      if (messages.value) {
        const a = document.getElementById("msgb")!;
        a.scrollTop = a.scrollHeight;
      }
    },
    {
      flush: "post",
    }
  );

  // load profile
  const auth = getAuth();
  onAuthStateChanged(auth, (e) => {
    e = e!;
    user.value = e;
    uid.value = e.uid;

    if (uid.value in permsList.value) {
      permsCurrent.value = permsList.value[uid.value];
    }
  });

  // load messages
  const db = getFirestore();
  const roomcol = collection(db, `rooms/${server.value.roomid}/messages`);

  const getHistory = async () => {
    const q = query(roomcol, orderBy("time", "desc"), limit(50));
    const roomSnapshot = await getDocs(q);

    messages.value = roomSnapshot.docs.map((e) => e.data()).reverse();
  };

  getHistory();

  // subscribe to the messages
  const unsub = onSnapshot(
    collection(db, `rooms/${server.value.roomid}/messages`),
    (doc) => {
      if (doc.docChanges()[0].type != "added") return;
      if (doc.docChanges().length === 1) {
        const msg = doc.docChanges()[0].doc.data();
        messages.value.push(msg);

        setTimeout(() => {
          const a = document.getElementById("msgb")!;
          a.scrollTop = a.scrollHeight;
        }, 0);
      }
    }
  );
});
</script>

<style lang="scss" scoped></style>
