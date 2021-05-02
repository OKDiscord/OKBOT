<template>
  <subtitle>Welcome to the OKBOT Dashboard.</subtitle>

  <div class="my-12">
    <div class="flex w-full justify-between">
      <resource-card
        class="mb-4 md:mb-0 md:mr-4 bg-primary"
        title="CPU Usage"
        usage="49.9%"
      />
      <resource-card
        class="mb-4 md:mb-0 md:mr-4 bg-primary bg-opacity-70"
        title="RAM Usage"
        usage="492 MB"
      />
      <resource-card
        class="mb-4 md:mb-0 md:mr-4 bg-primary"
        title="Disk Usage"
        usage="29 MB"
      />
      <resource-card
        class="bg-primary bg-opacity-70"
        title="Servers"
        usage="2"
      />
    </div>
  </div>

  <div>
    <div class="mb-6">
      <Title class="text-white">Changelog</Title>
    </div>
    <div class="w-full">
      <basic-card>
        <h2 class="text-white font-medium text-xl">Version 3.0.0</h2>
        <div class="my-4 text-gray-300">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris
          tincidunt sem sed arcu.

          <div class="my-2">
            <span>Improvements:</span>
            <ul class="list-disc mx-6">
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul>
          </div>
          <div class="my-2">
            <span>Features:</span>
            <ul class="list-disc mx-6">
              <li>Hello</li>
              <li>Hello</li>
              <li>Hello</li>
            </ul>
          </div>
        </div>
      </basic-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BasicCard from "../components/elements/card/BasicCard.vue"
import ResourceCard from "../components/elements/card/ResourceCard.vue"
import Subtitle from "../components/typography/Subtitle.vue"
import Title from "../components/typography/Title.vue"

export default defineComponent({
  name: "IndexPage",
  components: {
    Subtitle,
    Title,
    BasicCard,
    ResourceCard,
  },
  created: () => (document.title = "Domov | OKBOT"),
})
</script>
