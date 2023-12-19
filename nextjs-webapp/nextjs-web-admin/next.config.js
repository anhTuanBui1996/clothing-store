/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SERVICE_ORIGIN: "http://localhost:8081/api",
    PRODUCT_SERVICE_ORIGIN: "http://localhost:8082/api",
    ORDER_SERVICE_ORIGIN: "http://localhost:8083/api",
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "clothingstore",
    NEXT_PUBLIC_CLOUDINARY_API_KEY: "537227747721451",
    CLOUDINARY_API_SECRET: "IVGuerZpY6TBd1_E6jie7tnBUOw",
  },
};

module.exports = nextConfig;
