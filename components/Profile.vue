<template>
    <div class="profile">
      <img class="pfp" :src="userProfile.pfp" v-if="true">
      <span>
        {{ "Login" }}
      </span>
    </div>
</template>

<script lang="ts" setup>
const userProfile = ref({
  pfp: "",
  name: ""
})
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
