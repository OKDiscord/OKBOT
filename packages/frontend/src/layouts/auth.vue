<template>
  <div
    class="w-screen h-screen bg-primary-image-blur bg-no-repeat bg-cover flex justify-center items-center"
  >
    <div class="m-2 bg-white rounded-xl px-8 py-6">
      <alert-renderer class="w-full mb-4" />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AlertRenderer from "../components/elements/alert/AlertRenderer.vue"

export default defineComponent({
  components: {
    AlertRenderer,
  },
})
</script>
