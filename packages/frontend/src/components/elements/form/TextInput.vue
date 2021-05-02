<template>
  <input
    placeholder="Password"
    class="border bg-gray-50 hover:placeholder-gray-500 hover:text-black rounded px-4 py-2 outline-none transition duration-300 ease-in-out"
    :class="[
      !disabled && 'hover:bg-gray-100',
      error ? 'border-red-500 hover:border-red-500' : 'border-gray-50',
      !disabled && !error && 'hover:border-gray-100',
    ]"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  props: {
    disabled: Boolean,
    error: Boolean,
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
})
</script>
