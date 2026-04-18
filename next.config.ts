import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true, // Requerido para cPanel ya que no soporta Image Optimization de Next.js nativamente
  },
  trailingSlash: true, // Ayuda a cPanel a gestionar mejor las rutas de carpetas
};

export default nextConfig;
