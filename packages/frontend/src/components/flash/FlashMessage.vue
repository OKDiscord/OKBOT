<template>
  <div class="notification" :class="`is-${flash.type}`">
    <strong>{{ flash.title }}</strong>
    <br />
    <div v-if="typeof flash.message === 'object'">
      <span v-for="(message, i) of flash.message" :key="i">
        {{ message }}
        <br v-if="i !== (flash.message.length - 1)" />
      </span>
    </div>

    <div v-else>{{ flash.message }}</div>
  </div>
</template>

<script lang="ts">
import { FlashMessage } from "@/store"
import Vue, { PropType } from "vue"
export default Vue.extend({
  props: {
    flash: Object as PropType<() => FlashMessage>,
  },
})
</script>
