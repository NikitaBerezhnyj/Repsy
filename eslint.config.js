const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      sonarjs: require("eslint-plugin-sonarjs")
    },
    rules: {
      ...require("eslint-plugin-sonarjs").configs.recommended.rules,
      "sonarjs/cognitive-complexity": ["warn", 15]
    }
  }
]);
