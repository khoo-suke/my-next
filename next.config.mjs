/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com' },
    ],
  },
};

export default nextConfig;
