import store from ".."
import { Alert } from "../types"

const setAlerts = (arr: Alert[] | Alert = []) =>
  (store.alerts = Array.isArray(arr) ? arr : [arr])

const addAlerts = (...alerts: Alert[]) =>
  (store.alerts = [...store.alerts, ...alerts])

const clearAlerts = () => setAlerts([])

// Aliases

type Link = { to?: string } | { href?: string } | null

// because alert can be misplaced with JS alert
const notify = (
  content: Alert["content"],
  type: Alert["type"] = "info",
  clear = true,
  link: Link = {}
) =>
  (clear ? setAlerts : addAlerts)({
    content,
    type,
    ...link,
  })

const info = (content: Alert["content"], clear = true, link: Link = {}) =>
  notify(content, "info", clear, link)

const warn = (content: Alert["content"], clear = true, link: Link = {}) =>
  notify(content, "warning", clear, link)

const ok = (content: Alert["content"], clear = true, link: Link = {}) =>
  notify(content, "success", clear, link)

const fail = (content: Alert["content"], clear = true, link: Link = {}) =>
  notify(content, "error", clear, link)

export { setAlerts, addAlerts, clearAlerts, Link, notify, info, warn, ok, fail }
