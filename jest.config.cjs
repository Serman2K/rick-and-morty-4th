module.exports = {
  projects: [
    {
      preset: "ts-jest",
      testEnvironment: "jsdom",
      moduleNameMapper: {
        "^.+\\.(css|less)$": "<rootDir>/src/config/imgcssConfig.cjs",
        "^image![a-zA-Z0-9$_-]+$": "<rootDir>/src/config/imgcssConfig.cjs",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
          "<rootDir>/src/config/imgcssConfig.cjs",
      },
      testMatch: ["<rootDir>/src/__tests__/*jsdom.test.{js,jsx,tsx}"],
    },
    {
      preset: "ts-jest",
      testEnvironment: "node",
      testMatch: ["<rootDir>/src/__tests__/*node.test.{js,jsx,tsx}"],
    },
  ],
};
