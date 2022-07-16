<template>
    <div class="form">
      <h1>{{props.headingNormal}} <span class="fancy-text">{{props.headingHighlight}}</span></h1>
      <form @submit="submitEvent">
        <label class="input" v-for="i in props.inputs">
          <input class="input--field" :type="i.type" placeholder=" " v-model="i.ref.value" />
          <span class="input--label">{{i.name}}</span>
        </label>
        <label>
          <input type="submit" class="primary-btn btn" :value="props.submitText" />
        </label>
      </form>
    </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';


const props = defineProps<{
  headingNormal: string,
  headingHighlight: string,
  inputs: {
    ref: Ref<string>,
    name: string,
    type?: string
  }[],
  submitText: string,
  submitEvent: (e: Event) => {}
}>();


</script>


<style lang="scss" scoped>
.root {
  background-image: url("assets/stacked-peaks-haikei.svg");
  background-size: cover;

  height: 100vh;

  display: grid;
  place-items: center;
  grid-template-areas: "o a b";
}

.form {
  background-color: $bg-1;
  box-shadow: 0 0 13px lighten($color: $bg-1, $amount: 5);
  color: $fg-1;

  max-height: 70%;
  min-height: 45rem;
  min-width: 45rem;
  max-width: 50%;

  border-radius: 8px;
  padding: 20px;
  display: flex;

  align-items: center;
  flex-direction: column;
  gap: 5rem;

  grid-area: a;

  transition: all 0.5s;

  h1 {
    margin-top: 4rem;

    .fancy-text {
      color: $accent-1;
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .hidebtn {
      position: absolute;
      left: 21rem;
      cursor: pointer;
      color: $fg-2;
      font-size: 25px;
      top: 8px;
    }

    .btn {
      width: 22rem;
      height: 35px;
      margin-top: 3rem;
    }
  }
}
</style>