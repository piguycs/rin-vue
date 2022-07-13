<template>
    <div class="profile">
      <img class="pfp" :src="userProfile.pfp" v-if="user">
      <span>
        {{ user ? userProfile.name : "Login" }}
      </span>
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

<style lang="scss" scoped>
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
