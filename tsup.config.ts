import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/cli.tsx"],
    clean: true,
    shims: true,
    format: ["esm"],
});