import next from "eslint-config-next";

/**
 * Flat config. `next lint` was removed in Next 16, so `npm run lint` now calls
 * eslint directly — previously the script existed but errored out, which meant
 * the project shipped with no linting at all.
 */
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...next,
];

export default config;
