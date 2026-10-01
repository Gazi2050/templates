#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const { existsSync, readFileSync } = require("node:fs");
const { join } = require("node:path");

const tasks = {
  apk: "assembleRelease",
  aab: "bundleRelease",
};

const target = process.argv[2] || "apk";
const gradleTask = tasks[target];

if (!gradleTask) {
  console.error(
    `Unknown Android release target "${target}". Use "apk" or "aab".`,
  );
  process.exit(1);
}

const projectRoot = join(__dirname, "..");
const envPath = join(projectRoot, ".env");
const requiredKeys = [
  "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "EXPO_PUBLIC_API_BASE_URL",
];

function parseDotEnv(contents) {
  const values = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (!key) {
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

const dotEnv = existsSync(envPath)
  ? parseDotEnv(readFileSync(envPath, "utf8"))
  : {};
const buildEnv = { ...process.env };

for (const [key, value] of Object.entries(dotEnv)) {
  if (buildEnv[key] === undefined) {
    buildEnv[key] = value;
  }
}

if (!buildEnv.NODE_ENV) {
  buildEnv.NODE_ENV = "production";
}

const missingKeys = requiredKeys.filter((key) => !buildEnv[key]);

if (missingKeys.length > 0) {
  console.error(
    `Missing required Expo public environment variable(s): ${missingKeys.join(", ")}`,
  );
  console.error(
    "Set them in .env or export them before running the Android release build.",
  );
  process.exit(1);
}

const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
const result = spawnSync(gradlew, [gradleTask], {
  cwd: join(projectRoot, "android"),
  env: buildEnv,
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
