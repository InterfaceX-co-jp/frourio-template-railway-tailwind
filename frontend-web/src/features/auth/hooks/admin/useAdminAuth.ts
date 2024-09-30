// import { pagesPath } from '@/utils/$path'
// import { adminApiClient } from '@/utils/apiClient'
// import useAspidaSWR from '@aspida/swr'
// import { useRouter } from 'next/router'
// import { toast } from 'react-toastify'
// import { useAdminAuthToken } from './useAdminAuthToken'

export const useAdminAuth = () => {
  // const router = useRouter()
  // const { removeAuthState } = useAdminAuthToken()
  // const {
  //   data: adminData,
  //   isLoading: isLoadingAdminData,
  //   error: adminDataError,
  // } = useAspidaSWR(adminApiClient.auth.admin.me)
  // const handleAdminLogout = async () => {
  //   removeAuthState()
  //   router.push(pagesPath.admin.auth.login.$url())
  //   toast.success('ログアウトしました')
  // }
  // return {
  //   auth: {
  //     adminData,
  //     isLoadingAdminData,
  //     adminDataError,
  //   },
  //   isAuthenticated: !!adminData,
  //   handleAdminLogout,
  // }
}
