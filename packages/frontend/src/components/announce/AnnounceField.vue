<template>
  <div>
    <div class="field-group" style="margin-top: 40px; margin-bottom: 40px;">
      <div class="field">
        <label class="label">Titulek</label>
        <input
          type="text"
          @keyup="setTitle"
          class="input is-small"
          :disabled="disabled"
        />
      </div>
      <div class="field">
        <label class="label">Text</label>
        <textarea
          type="text"
          @keyup="setValue"
          class="input is-small"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: ["setTitle", "setValue", "disabled"],
})
</script>
