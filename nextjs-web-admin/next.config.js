/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_USER: "sa",
    DB_PWD: "1234abcd",
    DB_NAME: "DBNormal",
  },
};

module.exports = nextConfig;
