/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL:process.env.BASE_URL,
    API_URL: process.env.API_URL,
    RISK_DATA: process.env.RISK_DATA,
    RISK_DATA_CSV: process.env.RISK_DATA_CSV,
    GOOGLE_MAP_API_KEY : "AIzaSyDwyMjzC_DNXa5yj8ZDCwC0M4594JMa98o"
  }
}

module.exports = nextConfig
