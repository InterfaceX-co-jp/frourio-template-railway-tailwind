require('dotenv').config({ path: '../nftfun-monorepo-backend/.env' })

module.exports = {
  input: '../nftfun-monorepo-backend/api',
  baseURL: `${process.env.API_ORIGIN ?? ''}${process.env.API_BASE_PATH ?? ''}`,
}
