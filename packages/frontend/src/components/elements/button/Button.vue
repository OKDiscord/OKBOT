<template>
  <button
    class="rounded text-gray-100 hover:text-white hover:bg-opacity-90 transition duration-300 outline-none focus:outline-none"
    :class="[classes, $attrs.disabled && 'cursor-not-allowed']"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

export default defineComponent({
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false, // default size
    },
    large: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const sizes = {
      small: "px-4 py-1",
      medium: "px-6 py-2",
      large: "px-8 py-4",
      noPadding: "",
    }

    const classes = computed(() => {
      const selectedSize = Object.keys(sizes).filter(s => !!props[s])

      if (selectedSize.length !== 1) {
        if (selectedSize.length > 1)
          console.warn(
            "[Button] Selected more than 1 size. Using default (medium) size."
          )

        return sizes.medium
      }

      return sizes[selectedSize[0]]
    })

    return {
      classes,
    }
  },
})
</script>
