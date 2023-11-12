/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SERVICE_ORIGIN: "http://192.168.1.7:8084",
    PRODUCT_SERVICE_ORIGIN: "http://192.168.1.7:8081",
    USER_SERVICE_ORIGIN: "http://192.168.1.7:8082",
    ORDER_SERVICE_ORIGIN: "http://192.168.1.7:8083",
  },
};

module.exports = nextConfig;
