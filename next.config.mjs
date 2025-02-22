/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
        formats: ['image/webp']
    },
    output: 'export'
};

export default nextConfig;
