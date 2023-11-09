/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SERVICE_ORIGIN: "https://",
    PRODUCT_SERVICE_ORIGIN: "https://",
    USER_SERVICE_ORIGIN: "https://",
    ORDER_SERVICE_ORIGIN: "https://",
  },
};

module.exports = nextConfig;
