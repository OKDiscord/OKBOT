import Vue from "vue"
import { AxiosStatic } from "axios"

declare module "*.vue" {
  export default Vue
}

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosStatic
    $refs: {
      fieldsContainer: HTMLDivElement
    }
  }
}
