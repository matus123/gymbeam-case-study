const config = {
    externalService: {
        url: 'https://dev.aux.boxpi.com',
        apiKey: process.env.EXTERNAL_API_KEY,
    },
    server: {
        port: parseInt(process.env.PORT ?? '3000'),
        isProduction: process.env.NODE_ENV === 'production',
    },
} as const;

export default config;
