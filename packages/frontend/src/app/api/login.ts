import { $http } from ".."

interface LoginData {
  username: string
  password: string
}

const login = (data: LoginData) =>
  $http.request({
    method: "POST",
    url: "/auth/login",
    data,
  })

export { LoginData, login }
