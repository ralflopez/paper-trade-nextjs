import { NextApiRequest } from "next"
import jsHttpCookie from "cookie"
import jsCookie from "js-cookie"

const ACCESS_TOKEN_KEY = "accessToken_abcd"

export const getAccessToken = (context: any) => {
  let accessToken = ""
  if (typeof window === "undefined") {
    const cookiesString = context?.req?.headers?.cookie
    if (typeof cookiesString === "string") {
      const cookies = jsHttpCookie.parse(cookiesString)
      accessToken = cookies[ACCESS_TOKEN_KEY] || ""
    }
  } else {
    accessToken = jsCookie.get(ACCESS_TOKEN_KEY)
  }

  return accessToken
}

export const setAccessToken = (token: string) => {
  jsCookie.set(ACCESS_TOKEN_KEY, token)
}

export const removeAccessToken = () => {
  jsCookie.remove(ACCESS_TOKEN_KEY)
}
