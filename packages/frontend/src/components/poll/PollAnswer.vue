<template>
  <div class="field">
    <label class="label">Odpověď</label>
    <input type="text" @keyup="setAnswer" class="input is-small" :disabled="disabled" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: ["setAnswer", "disabled"],
})
</script>
