const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    apiUrl: 'https://develop-api.bookstore.dwarvesf.com/api/v1',
    loginPath: '/auth/login',
    signupPath: '/auth/signup',
  },
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
