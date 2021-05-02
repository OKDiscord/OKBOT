<template>
  <nav
    class="w-full z-50 fixed transition-all duration-300 ease-in-out"
    :class="fixed && 'md:px-12 md:my-4'"
  >
    <div
      class="bg-gray-800 transition-all duration-300 ease-in-out w-full py-2 flex items-center justify-between px-8 shadow-2xl"
      :class="fixed && 'rounded'"
    >
      <div class="flex">
        <router-link to="/" class="text-white font-medium mr-8">
          OKBOT
        </router-link>
        <div class="flex">
          <router-link
            to="#"
            class="mr-4 text-gray-200 hover:text-white line line-none hover:line-full transition duration-300 ease-in-out"
          >
            Moderation
          </router-link>
          <router-link
            to="#"
            class="mr-4 text-gray-200 hover:text-white line line-none hover:line-full transition duration-300 ease-in-out"
          >
            Utils
          </router-link>
        </div>
      </div>
      <div>
        <Button small class="bg-primary">Sign out</Button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue"
import store from "../../store"
import Button from "../elements/button/Button.vue"

export default defineComponent({
  components: { Button },
  setup() {
    const fixed = ref(false)

    const handleScroll = () => (fixed.value = window.scrollY >= 120)

    onMounted(() => window.addEventListener("scroll", handleScroll))
    onUnmounted(() => window.removeEventListener("scroll", handleScroll))

    return {
      fixed,
    }
  },
})
</script>
