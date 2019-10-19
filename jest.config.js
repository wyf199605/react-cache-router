const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    preset: 'ts-jest',
    globals: {
        __DEV__: true
    },
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    watchPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || [], { prefix: '<rootDir>/' }),
    rootDir: __dirname,
    testMatch: [
        "<rootDir>/lib/**/__tests__/**/*.spec.[tj]s?(x)"
    ]
};