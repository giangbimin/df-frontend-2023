require('dotenv').config();

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/books',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
