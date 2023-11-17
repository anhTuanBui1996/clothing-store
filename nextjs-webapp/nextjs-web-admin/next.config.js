/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SERVICE_ORIGIN: "http://localhost:8084",
    PRODUCT_SERVICE_ORIGIN: "http://localhost:8081",
    USER_SERVICE_ORIGIN: "http://localhost:8082",
    ORDER_SERVICE_ORIGIN: "http://localhost:8083",
  },
};

module.exports = nextConfig;
