import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ["**/test/**/*.[jt]s?(x)"], // look inside test folder
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
