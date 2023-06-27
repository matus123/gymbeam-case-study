module.exports = {
    // https://jestjs.io/docs/en/configuration#coverageprovider-string
    // coverageProvider: 'v8', // use this when building on node v14+
    collectCoverage: true,
    coverageDirectory: './coverage',
    coverageReporters: ['json', 'text', 'lcov'],
    collectCoverageFrom: ['./src/**/*.ts', '!src/**/__tests__/**/*'],
    coveragePathIgnorePatterns: ['/node_modules/', '/@types/', '/tests/'],
    projects: [
        {
            displayName: 'Unit tests',
            preset: 'ts-jest',
            verbose: true,
            testEnvironment: 'node',
            testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/build/'],
            testRegex: ['./src/.*__tests__/.*.(?:spec|test).ts$'],
            transform: {
                '^.+\\.ts$': 'ts-jest',
            },
            moduleFileExtensions: ['ts', 'js', 'json', 'node'],
            globals: {
                'ts-jest': {
                    diagnostics: false,
                    isolatedModules: true,
                    tsconfig: './tsconfig.test.json',
                },
            },
            setupFiles: ['<rootDir>/tests/setup.ts'],
        },
        {
            displayName: 'Integration tests',
            preset: 'ts-jest',
            verbose: true,
            testEnvironment: 'node',
            testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/build/'],
            testRegex: './tests/integration/.*\\.(?:spec|test)\\.ts$',
            transform: {
                '^.+\\.ts$': 'ts-jest',
            },
            moduleFileExtensions: ['ts', 'js', 'json', 'node'],
            globals: {
                'ts-jest': {
                    isolatedModules: true,
                    tsconfig: './tsconfig.test.json',
                },
            },
            setupFiles: ['<rootDir>/tests/setup.ts'],
        },
    ],
};
