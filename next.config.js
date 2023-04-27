/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL:process.env.BASE_URL,
    API_URL: process.env.API_URL,
    RISK_DATA: process.env.RISK_DATA,
    RISK_DATA_CSV: process.env.RISK_DATA_CSV
  }
}

module.exports = nextConfig
