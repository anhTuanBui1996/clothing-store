/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PRODUCT_SERVICE_DOMAIN: "http://user-service.com/",
    USER_SERVICE_DOMAIN: "http://user-service.com/",
    ORDER_SERVICE_DOMAIN: "http://user-service.com/",
  },
};

module.exports = nextConfig;
