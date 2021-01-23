<template>
  <div v-if="error" class="notification is-danger">
    <p>Nelze načíst channely. Prosím, zkuste to později.</p>
  </div>

  <VSelect :options="channels" v-else :disabled="error" @input="setChannel">
    <span slot="no-options" style="margin-top: 5px;"
      >Takový channel neexistuje.</span
    >
  </VSelect>
</template>

<script lang="ts">
import Vue from "vue"

export type Channel = {
  id: string
  label: string // === name, just for vue-select
  name: string
  nsfw: boolean
}

export type ChannelsResponse = {
  success: boolean
  channels: Channel[]
}

export default Vue.extend({
  props: ["setChannel", "change", "setSuccessFetch"],
  data: () => ({
    toggled: false,
    channels: [] as Channel[],
    error: false,
  }),
  async mounted() {
    try {
      const response = await this.$axios.request<ChannelsResponse>({
        url: "/channels",
        method: "GET",
      })

      if (!response.data.success) return (this.error = true)

      this.channels = response.data.channels.map<Channel>(e => {
        e.label = e.name
        return e
      })
      this.setSuccessFetch(true)
    } catch (e) {
      console.log(e)
      this.error = true
      this.setSuccessFetch(false)
    }
  },
})
</script>
