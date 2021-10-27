module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        quotes: "off",
        // singleQuote: true,
        trailingComma: "es5",
        semi: true,
        // tabWidth: 2,
        // useTabs: true,
        // indent: ["error", "tab"],
        //noMixedSpacesAndTabs: ["error", "smart-tabs"],
        // printWidth: 120,
        // camelcase: 'off',
      },
    ],
  },
};
