/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PRODUCT_SERVICE_ORIGIN: "http://localhost:8081/api",
    USER_SERVICE_ORIGIN: "http://localhost:8082/api",
    ORDER_SERVICE_ORIGIN: "http://localhost:8083/api",
  },
};

module.exports = nextConfig;
