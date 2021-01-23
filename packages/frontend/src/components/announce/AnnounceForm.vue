<template>
  <form @submit.prevent="submit">
    <div class="field" v-if="formErrors.processing !== null">
      <div class="notification is-danger">{{ formErrors.processing }}</div>
    </div>

    <div class="field" :class="{ 'is-danger': formErrors.title !== null }">
      <label class="label is-size-4">Nadpis</label>
      <input
        type="text"
        v-model="title"
        class="input is-medium"
        @keydown="validateTitle"
        @click="validateTitle"
        :disabled="formLoading || fetchError"
      />
      <p class="hint" v-if="formErrors.title !== null">
        {{ formErrors.title }}
      </p>
    </div>

    <div class="field" :class="{ 'is-danger': formErrors.channel !== null }">
      <label class="label is-size-4">Channel</label>
      <ChannelPicker
        :setChannel="setChannel"
        :change="validateChannel"
        :setSuccessFetch="setSuccessFetch"
      />
      <p class="hint" v-if="formErrors.channel !== null">
        {{ formErrors.channel }}
      </p>
    </div>

    <div class="field has-text-right" style="margin-top: 30px !important;">
      <button
        class="button"
        @click.prevent="createField"
        :class="{
          'is-info': !formLoading,
          'is-dark': formLoading || fetchError,
        }"
        :disabled="formLoading || fetchError"
      >
        + Přidat field
      </button>
    </div>

    <div ref="fieldsContainer"></div>

    <div class="field has-text-right" style="margin-top: 60px !important;">
      <button
        class="button is-medium"
        :class="{
          'is-primary': !formLoading && !fetchError,
          'is-dark': formLoading || fetchError,
          'is-loading': formLoading,
        }"
        :disabled="formLoading || fetchError"
        type="submit"
      >
        Odeslat
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import AnnounceField from "./AnnounceField.vue"
import ChannelPicker, { Channel } from "../ChannelPicker.vue"
import { CombinedVueInstance } from "vue/types/vue"

export default Vue.extend({
  components: {
    AnnounceField,
    ChannelPicker,
  },
  data: () => ({
    title: "",
    fields: [] as {
      element?: CombinedVueInstance<
        Record<never, any> & Vue,
        object,
        object,
        object,
        Record<never, any>
      >
      name: string
      value: string
    }[],
    channel: null as Channel | null,
    formLoading: false,
    fetchError: true,
    formErrors: {
      title: null,
      channel: null,
      processing: null,
    } as { [key: string]: string | null },
  }),
  mounted() {
    this.createField()
  },
  methods: {
    async submit() {
      const validate = this.validate()
      if (!validate) return

      this.formLoading = true
      this.fields = this.fields.filter(el => el.name !== "" && el.value !== "") // filter out empty fields

      try {
        const response = await this.$axios.request({
          method: "POST",
          url: "/announce",
          data: {
            title: this.title,
            fields: this.fields.map(el => {
              el.element = undefined
              return el
            }),
            channel: this.channel!.id,
          },
        })
      } catch (e) {
        console.log(e)
        this.formErrors.processing = `Nastalo k chybě při zpracovávání požadavku. Chyba: ${e.message}`
      }
      this.formLoading = false
    },
    createField() {
      const newFieldId = this.fields.length

      this.fields.push({
        name: "",
        value: "",
      })

      const AnnounceFieldInstance = Vue.extend(AnnounceField)

      const field = new AnnounceFieldInstance({
        propsData: {
          setTitle: (newTitle: any) =>
            {console.log(newTitle);(this.fields[newFieldId].name = newTitle.target.value)},
          setValue: (newValue: any) =>
            {console.log(newValue);(this.fields[newFieldId].value = newValue.target.value)},
          disabled: this.formLoading || this.fetchError,
        },
      })
      field.$mount()

      this.fields[newFieldId].element = field

      // @ts-ignore
      this.$refs.fieldsContainer.appendChild(field.$el)
    },
    setChannel(c: Channel | null) {
      console.log("setChannel", c)
      this.formErrors.channel = c === null ? "Nebyl vybrán channel." : null
      this.channel = c
    },
    validate() {
      const isChannel = this.validateChannel()
      const isTitle = this.validateTitle()

      return isChannel && isTitle
    },
    validateChannel() {
      console.log("validateChannel", this.channel)
      this.formErrors.channel = this.channel ? null : "Nebyl vybrán channel."
      return Boolean(this.channel)
    },
    validateTitle() {
      let isTitle = !this.title || this.title === ""

      this.formErrors.title = isTitle ? "Nebyl zadán nadpis." : null
      return !isTitle
    },
    setSuccessFetch(val: boolean) {
      console.log("success", val)
      this.fetchError = !val
      for (const { element } of this.fields) {
        if (!element) continue
        element.$props.disabled = !val
      }
    },
  },
})
</script>
