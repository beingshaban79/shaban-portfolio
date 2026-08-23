/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local screenshots only — no remote hosts, so the Image Optimizer has no
    // attacker-controlled input surface.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 828, 1080, 1200, 1920],
  },
  // three.js ships untranspiled ESM examples; Next handles this fine but the
  // explicit hint keeps the R3F chunk out of the server bundle.
  transpilePackages: ["three"],
};

export default nextConfig;
