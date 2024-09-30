// import { pagesPath } from '@/utils/$path'
// import { userApiClient } from '@/utils/apiClient'
// import useAspidaSWR from '@aspida/swr'
// import { useRouter } from 'next/router'
// import { toast } from 'react-toastify'
// import { useUserAuthToken } from './useUserAuthToken'

export const useUserAuth = () => {
  // const router = useRouter()
  // const { removeAuthState } = useUserAuthToken()
  // const {
  //   data: userData,
  //   isLoading: isLoadingUserData,
  //   error: userDataError,
  //   mutate: mutateUserData,
  // } = useAspidaSWR(userApiClient.auth.user.me)
  // const handleUserLogout = async () => {
  //   removeAuthState()
  //   router.push(pagesPath.$url())
  //   toast.success('ログアウトしました')
  //   mutateUserData()
  // }
  // return {
  //   auth: {
  //     userData,
  //     isLoadingUserData,
  //     userDataError,
  //     mutateUserData,
  //   },
  //   isAuthenticated: !!userData,
  //   handleUserLogout,
  // }
}
