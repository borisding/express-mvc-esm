module.exports = {
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverageFrom: [
    'app/**/*.js',
    'assets/**/*.js',
    'utils/*.js',
    '!**/node_modules/**',
    '!public/build',
    '!app/index.js',
    '!utils/index.js'
  ],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assets/jest/fileMock.js',
    '\\.(css|scss|sass)$': '<rootDir>/assets/jest/styleMock.js'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
