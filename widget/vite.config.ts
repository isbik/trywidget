import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const bundle_filename = "widget.js";
const css_filename = "style.css";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3001,
  },
  build: {
    outDir: "../client/public/",
    lib: {
      entry: "src/index.tsx",
      name: bundle_filename,
      fileName: () => bundle_filename,
      formats: ["iife"],
    },
    cssCodeSplit: false,
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      plugins: [
        {
          apply: "build",
          enforce: "post",
          name: "pack-css",
          generateBundle(opts, bundle) {
            const {
              [css_filename]: { source: rawCss },
              [bundle_filename]: component,
            } = bundle;

            const IIFEcss = `
              (function(){var elementStyle=document.createElement('style');elementStyle.innerText=${JSON.stringify(
                rawCss,
              )};document.head.appendChild(elementStyle)})()`;

            component.code += IIFEcss;

            // remove from final bundle
            delete bundle[css_filename];
          },
        },
      ],
    },
  },
});
