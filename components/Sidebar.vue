<template>
  <div class="sidebar--full">
    <button class="fancy-btn btn" @click="$emit('add-connection')">
      Support Us ❤
    </button>

    <div>
      <span>room: {{ 0 }}</span>
    </div>
    <div class="profile">
      <img class="pfp" :src="userProfile.pfp" v-if="user">
      <span>
        {{ user ? userProfile.name : "Login" }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const userProfile = ref({
  pfp: "",
  name: ""
})

watchEffect(async () => {
  if (user.value) {
    const id = user.value.id;
    const profile = (
      await $fetch("/api/profile", { params: { id } })
    ).profile
    userProfile.value = {
      pfp: profile.avatar_url,
      name: profile.username
    }
  }
});


</script>

<style lang="scss">
@import "assets/styles/fancy-elements.scss";

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

.btn {
  border-radius: 4px;
  height: 33px;
}

.profile {
  border-radius: 10px;
  padding: 8px;
  margin: -12px;
  background-color: $bg-3;
  font-size: 18px;
  transform: scale(1.04);

  display: grid;
  grid-template-areas: "pfp name";
  align-items: center;
  grid-template-columns: 44px 1fr;
}

.pfp {
  width: 36px;
  border-radius: 50%;
}
</style>
