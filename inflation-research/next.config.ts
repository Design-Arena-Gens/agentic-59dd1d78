import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfmake", "@foliojs-fork/fontkit"],
};

export default nextConfig;
