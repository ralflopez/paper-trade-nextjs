import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import React from "react"
import { LOGOUT } from "../../graphql/query/auth"
import { removeAccessToken } from "../../lib/auth/accessTokenCookie"

const LogoutButton = () => {
  const router = useRouter()
  const [logout] = useLazyQuery(LOGOUT)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      console.error("Cannot reach the server")
    }
    removeAccessToken()
    router.push("/")
  }

  return <button onClick={handleLogout}>LogoutButton</button>
}

export default LogoutButton
