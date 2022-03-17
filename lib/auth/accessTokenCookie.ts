import jsHttpCookie from "cookie"
import jsCookie from "js-cookie"
import nookies, { parseCookies } from "nookies"

export const ACCESS_TOKEN_KEY = "accessToken_abcd"

export const getAccessToken = (context: any) => {
  if (typeof window === "undefined") {
    console.log("Server")
    const cookies = nookies.get(context)
    console.log(cookies)
    return cookies[ACCESS_TOKEN_KEY] || ""
  } else {
    const cookies = parseCookies()
    return cookies[ACCESS_TOKEN_KEY] || ""
  }
}

export const getServerAccessToken = (context: any) => {
  const cookies = nookies.get(context)
  return cookies[ACCESS_TOKEN_KEY] || ""
}

export const setClientAccessToken = (token: string) => {
  // jsCookie.set(ACCESS_TOKEN_KEY, token)
  nookies.set(null, ACCESS_TOKEN_KEY, token, {
    path: "/",
  })
}

export const removeAccessToken = () => {
  jsCookie.remove(ACCESS_TOKEN_KEY)
}
