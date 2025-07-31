module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|expo-font|expo-asset|expo-constants|expo-splash-screen|expo(nent)?|@expo(nent)?|expo-modules-core)/)"
  ]
};
