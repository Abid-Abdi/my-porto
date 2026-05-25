import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/rapier",
  ],
  serverExternalPackages: ["@dimforge/rapier3d-compat"],
};

export default nextConfig;
