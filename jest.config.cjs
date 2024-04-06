/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^.+\\.(css|less)$": "<rootDir>/src/config/imgcssConfig.cjs",
    "^image![a-zA-Z0-9$_-]+$": "<rootDir>/src/config/imgcssConfig.cjs",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/config/imgcssConfig.cjs",
  },
};
