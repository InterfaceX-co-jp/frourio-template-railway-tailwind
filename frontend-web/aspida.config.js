require('dotenv').config({ path: '../backend-api/.env' })

module.exports = {
  input: '../backend-api/api',
  baseURL: `${process.env.API_ORIGIN ?? ''}${process.env.API_BASE_PATH ?? ''}`,
}
