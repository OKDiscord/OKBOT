import { App } from "@vue/runtime-core"
import axios, { AxiosResponse } from "axios"
import { fail } from "../store/alert"

interface BaseError {
  kind: string
  message: string
}

interface SuccessResponse<TData extends object = object> {
  success: true
  data: TData
}

interface ErrorResponse {
  success: false
  error: BaseError
}

const $http = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://backend.okeyko.eu",
})

// In future, this may change and logic may extend,
// hence why there is a separate function. For now though,
// we will just use the message.
const toHuman = ({ kind, message }: BaseError) => message

const alertError = (baseError: BaseError) => fail(toHuman(baseError))

const handleResponse = <TData extends object = object>(
  data: SuccessResponse<TData> | ErrorResponse,
  successCb?: (data: TData) => unknown,
  errorCb: (err: BaseError) => unknown = alertError
) => {
  console.log("Response Data: ", data)

  if (data.success) return successCb?.(data.data)

  return errorCb(data.error)
}

const createRequest = <
  TReqData extends any = any,
  TData extends object = object
>(
  handler: (
    reqData?: TReqData
  ) => Promise<AxiosResponse<SuccessResponse<TData> | ErrorResponse>>,
  successCb?: (data: TData) => unknown,
  errorCb: (err: BaseError) => unknown = alertError
) => {
  const fetch = async (reqData?: TReqData) => {
    try {
      const { data } = await handler(reqData)

      handleResponse<TData>(data, successCb, errorCb)
    } catch (e) {
      errorCb?.({
        kind: "INTERNAL",
        message: "An internal error occurred.",
      })
    }
  }

  return {
    fetch,
  }
}

const installHttp = {
  install: (app: App) => {
    app.provide("http", $http)
    app.config.globalProperties.$http = $http
  },
}

export {
  $http,
  installHttp,
  SuccessResponse,
  ErrorResponse,
  BaseError,
  handleResponse,
  toHuman,
  alertError,
  createRequest,
}
