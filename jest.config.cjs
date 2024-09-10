module.exports = {
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverageFrom: [
    'app/**/*.js',
    'assets/**/*.js',
    '!**/node_modules/**',
    '!public/build'
  ],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
