import aspida from '@aspida/axios'
import axios from 'axios'
import api from '../../../backend-api/api/$api'
import { adminAuthStateInSessionStorage, userAuthStateInSessionStorage } from './sessionStorage'

const defaultWithoutAuthAxiosInstance = axios.create()
const adminAxiosInstance = axios.create()
const userAxiosInstance = axios.create()

adminAxiosInstance.interceptors.request.use(async (config) => {
  const token = adminAuthStateInSessionStorage.get().token

  config.headers.Authorization = `Bearer ${token}`

  return config
})

userAxiosInstance.interceptors.request.use(async (config) => {
  const token = userAuthStateInSessionStorage.get().token

  config.headers.Authorization = `Bearer ${token}`

  return config
})

export const defaultWithoutAuthApiClient = api(aspida(defaultWithoutAuthAxiosInstance))
export const adminApiClient = api(aspida(adminAxiosInstance))
export const userApiClient = api(aspida(userAxiosInstance))
