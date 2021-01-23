<template>
  <form @submit.prevent="submit">
    <div class="field" :class="{ 'is-danger': formErrors.title !== null }">
      <label class="label is-size-4">Otázka</label>
      <input
        type="text"
        v-model="title"
        class="input is-medium"
        @keydown="validateTitle"
        @click="validateTitle"
        :disabled="formLoading || fetchError"
      />
      <p class="hint" v-if="formErrors.title !== null">{{ formErrors.title }}</p>
    </div>

    <div class="field" :class="{ 'is-danger': formErrors.channel !== null }">
      <label class="label is-size-4">Channel</label>
      <ChannelPicker
        :setChannel="setChannel"
        :change="validateChannel"
        :setSuccessFetch="setSuccessFetch"
      />
      <p class="hint" v-if="formErrors.channel !== null">{{ formErrors.channel }}</p>
    </div>
    <div class="field columns" style="margin-top: 30px !important">
      <div class="column" v-if="answers.length >= 10">
        <p
          class="has-text-danger is-inline-block"
          data-tooltip="Na Dicordu jsou jen emoty 1-10, proto je maximum 10."
        >Můžeš přidat jen 10 odpovědí.</p>
      </div>
      <div class="column has-text-right">
        <button
          class="button"
          @click.prevent="createField"
          :disabled="answers.length >= 10"
          :class="{
            'is-dark is-disabled': answers.length >= 10,
            'is-info': answers.length < 10
          }"
        >+ Přidat odpověď</button>
      </div>
    </div>

    <div ref="answersContainer"></div>

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
      >Odeslat</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"
import PollAnswer from "./PollAnswer.vue"
import ChannelPicker, { Channel } from "../ChannelPicker.vue"
import { CombinedVueInstance } from "vue/types/vue"
import { flashError, clearFlash, flashOneMessage } from "@/app/functions/flash"

export default Vue.extend({
  components: {
    PollAnswer,
    ChannelPicker,
  },
  data: () => ({
    title: "",
    answers: [] as {
      element?: CombinedVueInstance<
        Record<never, any> & Vue,
        object,
        object,
        object,
        Record<never, any>
      >
      value: string
    }[],
    channel: null as Channel | null,
    formLoading: false,
    fetchError: true,
    formErrors: {
      title: null,
      channel: null,
    } as { [key: string]: string | null },
  }),
  mounted() {
    this.createField()
  },
  methods: {
    async submit() {
      clearFlash()

      const validate = this.validate()
      if (!validate) return

      this.formLoading = true
      this.answers = this.answers.filter(el => el.value && el.value !== "") // filter out empty fields

      try {
        const response = await this.$axios.request({
          method: "POST",
          url: "/poll",
          data: {
            question: this.title,
            answers: this.answers.map<string>(el => {
              return el.value
            }),
            channel: this.channel!.id,
          },
        })

        flashOneMessage({
          type: "success",
          title: "Úspěch!",
          message: "Hlasování bylo úspěšně odesláno!",
        })
      } catch (e) {
        console.log(e)
        flashError(
          e.isAxiosError ? e.response.data.state : "exception",
          e.isAxiosError ? e.response.data.localized : e.message
        )
      }
      this.formLoading = false
    },
    createField() {
      const newAnswerId = this.answers.length

      this.answers.push({
        value: "",
      })

      const PollAnswerInstance = Vue.extend(PollAnswer)

      const field = new PollAnswerInstance({
        propsData: {
          setAnswer: (newValue: any) =>
            (this.answers[newAnswerId].value = newValue.target.value),
          disabled: this.formLoading || this.fetchError,
        },
      })
      field.$mount()

      this.answers[newAnswerId].element = field

      // @ts-ignore
      this.$refs.answersContainer.appendChild(field.$el)
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
      for (const { element } of this.answers) {
        if (!element) continue
        element.$props.disabled = !val
      }
    },
  },
})
</script>
