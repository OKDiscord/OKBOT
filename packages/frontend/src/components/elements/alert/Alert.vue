<template>
  <div :class="color" class="flex items-center w-full rounded">
    <div
      class="rounded-l px-4 py-2 uppercase"
      :class="color.replace('500', '600')"
    >
      {{ alert.type }}
    </div>
    <div class="mx-4">
      <div v-if="isArray(alert.content)">
        <span v-for="(line, i) of alert.content" :key="i">
          <component :is="message" />
          <br v-if="i !== alert.content.length - 1" />
        </span>
      </div>
      <span v-else>
        {{ alert.content }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Alert } from "../../../store/types"
import { computed, defineComponent, PropType } from "vue"

export default defineComponent({
  props: {
    alert: {
      type: Object as PropType<Alert>,
      default: () => ({
        type: "info",
        content: "",
      }),
    },
  },
  setup(props) {
    const colorClasses: {
      [key in Alert["type"]]
    } = {
      info: "bg-blue-500 text-white",
      warning: "bg-yellow-500 text-gray-600",
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
    }

    const color = computed(() => colorClasses[props.alert.type ?? "info"])

    return {
      color,
      isArray: Array.isArray,
    }
  },
})
</script>
