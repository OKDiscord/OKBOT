<template>
  <div
    class="py-8 px-4 w-full rounded cursor-pointer transform hover:scale-90 transition duration-300 ease-in-out"
  >
    <div class="uppercase text-gray-200 text-sm">{{ title }}</div>
    <div class="text-white text-xl">{{ usage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    title: String,
    usage: String,
  },
})
</script>
