<template>
  <div class="sidebar--full" v-if="props.full">
    <button class="primary-btn btn" @click="$emit('change-style')">
      Add Connection
    </button>

    <div>
      {{ props.full }}
    </div>
    <div class="profile">
      <span>
        {{ options.user }}
      </span>
    </div>
  </div>
  <div class="sidebar--compact" v-else>
    <button class="primary-btn btn" @click="$emit('change-style')">Add</button>
    <span>smol</span>
    <div class="profile">
      pfp
    </div>

  </div>
</template>

<script lang="ts" setup>
interface optionst {
  user: string;
  full: boolean;
}

const options: optionst = reactive({
  user: "thepiguy",
  full: true,
});

const props = defineProps(["full"]);
</script>

<style lang="scss">
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
    margin: 17px 20px 12px;
    border-radius: 12px;
    padding: 12px;
  }

  &--compact {
    @extend .sidebar;
    margin: 17px 20px 12px;
    border-radius: 12px;
    padding: 12px;
  }
}

.btn {
  border-radius: 4px;
  margin: 4px;
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
}
</style>
