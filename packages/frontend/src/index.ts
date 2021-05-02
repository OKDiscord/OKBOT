// Vue

import { createApp } from "vue"

// Plugins

import router from "./router"
import { RouterView } from "vue-router"
import { installStore as store } from "./store"
import { installHttp as http } from "./app"

import "./assets/tailwind.css"
import "./assets/scss/select.scss"

// Global Components

// @ts-ignore
import Select from "vue-select"

// Settings

const bindToWindow = false
const mount = "#app"

// Create App

const app = createApp(RouterView)

app.component("VSelect", Select).use(store).use(router).use(http)

app.mount(mount)

if (bindToWindow) (window as any)._app = app
