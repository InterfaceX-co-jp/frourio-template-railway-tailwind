import { userAuthStateInCookieStorage } from '@/utils/cookieStorage'
import { userAuthStateInSessionStorage } from '@/utils/sessionStorage'
import { useEffect, useState } from 'react'

export const useUserAuthToken = () => {
  const [isAuthorized, setAuthorized] = useState(false)

  useEffect(() => {
    const authData = userAuthStateInSessionStorage.get()
    setAuthorized(authData.token !== '')
  }, [])

  const setAuthState = (args: { token: string }) => {
    userAuthStateInSessionStorage.set(args)
    userAuthStateInCookieStorage.set(args)
    setAuthorized(true)
  }

  const getAuthState = () => {
    return userAuthStateInSessionStorage.get()
  }

  const removeAuthState = () => {
    userAuthStateInSessionStorage.remove()
    userAuthStateInCookieStorage.remove()
    setAuthorized(false)
  }

  return {
    isAuthorized,
    setAuthState,
    getAuthState,
    removeAuthState,
  }
}
