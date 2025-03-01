const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/**', // Adjust the pattern based on your Firebase storage structure
            },
        ],
        formats: ['image/webp'],
    }
    // trailingSlash: true
    // output: 'export'
};

export default nextConfig;
