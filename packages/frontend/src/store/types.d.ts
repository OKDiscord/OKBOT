import { DefineComponent } from "@vue/runtime-core"

interface Alert {
  type?: "info" | "warning" | "success" | "error"
  content: string | DefineComponent
  to?: string
  href?: string
}
