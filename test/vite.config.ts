import { defineConfig } from "vite";
import viteDevLogger from "../src";

export default defineConfig({
  plugins: [
    viteDevLogger({
      url: "/dev-logger",
      outputFolder: "logs",
      outputFileName: "test-log",
    }),
  ],
});
