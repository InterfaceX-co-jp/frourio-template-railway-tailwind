import { adminAuthStateInCookieStorage } from '@/utils/cookieStorage'
import { adminAuthStateInSessionStorage } from '@/utils/sessionStorage'
import { useEffect, useState } from 'react'

export const useAdminAuthToken = () => {
  const [isAuthorized, setAuthorized] = useState(false)

  useEffect(() => {
    const authData = adminAuthStateInSessionStorage.get()
    setAuthorized(authData.token !== '')
  }, [])

  const setAuthState = (args: { token: string }) => {
    adminAuthStateInSessionStorage.set(args)
    adminAuthStateInCookieStorage.set(args)
    setAuthorized(true)
  }

  const getAuthState = () => {
    return adminAuthStateInSessionStorage.get()
  }

  const removeAuthState = () => {
    adminAuthStateInSessionStorage.remove()
    adminAuthStateInCookieStorage.remove()
    setAuthorized(false)
  }

  return {
    isAuthorized,
    setAuthState,
    getAuthState,
    removeAuthState,
  }
}
