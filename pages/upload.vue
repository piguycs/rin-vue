<template>
  <form class="upload" @submit="submit">
    <label for="pfp">
      <img :src="img" />
    </label>
    <input
      type="file"
      accept="image/*"
      name="pfp"
      id="pfp"
      @change="previewFiles"
    />
    <input type="submit" value="submit" />
  </form>
  <a :href="url" v-if="url">Image URL</a>
</template>

<script lang="ts" setup>
import { getStorage, ref as stref, uploadBytes } from "firebase/storage";
const url = ref("");

const img = ref("");
function previewFiles(e) {
  img.value = URL.createObjectURL(e.target.files[0]);
}

async function submit(e: Event) {
  e.preventDefault();

  const time = Date.now().toString();

  const storage = getStorage();
  const pfpref = stref(storage, `profilePictures/${time}`);

  const pfp: any = document.querySelector("input[type=file]#pfp");
  if (!(pfp.files && pfp.files.length > 0)) {
    return;
  }

  const file: File = pfp.files[0];

  const bl = new Blob([file]);

  // console.log(bl);

  uploadBytes(pfpref, file).then((snapshot) => {
    // having to use this weird syntax
    // coz otherwise onMounted for some reason becomes
    // undefined.... I truly hate js with a passion
    url.value =
      "https://firebasestorage.googleapis.com/v0/b/rin-backend.appspot.com/o/profilePictures%2F" +
      time +
      "?alt=media";
  });
}

onMounted(() => {
  const pfp: any = document.querySelector("input[type=file]#pfp");
  if (pfp.files && pfp.files.length > 0) {
    img.value = URL.createObjectURL(pfp.files[0]);
  }
});
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  gap: 8px;
}

img {
  aspect-ratio: 1/1;
  height: 200px;
  object-fit: cover;
}
</style>
