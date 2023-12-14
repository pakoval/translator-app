module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue2-jest",
  },
};
