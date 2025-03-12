/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  extensionsToTreatAsEsm: [".ts"], // Indica que trate archivos .ts como módulos ESM
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};