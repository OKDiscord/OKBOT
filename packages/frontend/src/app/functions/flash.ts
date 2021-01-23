import store, { FlashMessage } from "@/store"
import { arrayEmpty } from "./misc"

export const flashMessage = (flash: FlashMessage) => {
  return store.dispatch("flashMessage", flash)
}

export const flashOneMessage = (flash: FlashMessage) => {
  return store.dispatch("flashOneMessage", flash)
}

export const clearFlash = () => {
  return store.dispatch("clearFlash")
}

export const hasFlash = () => {
  return !arrayEmpty(store.getters("getFlashMessages"))
}

export const flashError = (state: any, localized: any) => {
  return flashOneMessage({
    title: `Došlo k chybě (State: ${state ?? "unknown"})`,
    message: localized ?? "Neznámá chyba. Prosím zkuste to později.",
    type: "danger"
  })
}
