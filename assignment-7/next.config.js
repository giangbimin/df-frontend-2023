const nextConfig = {
  reactStrictMode: false,
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
