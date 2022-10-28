import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.es.js",
      format: "es",
    },
    external: ['axios', 'form-data'],
    plugins: [typescript(), babel({ extensions: [".ts"], exclude: "node_modules/**"})],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.umd.js",
      format: "cjs",
    },
    external: ['axios', 'form-data'],
    plugins: [
      typescript(),
      babel({ extensions: [".ts"], exclude: "node_modules/**" }),
    ],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts({
      respectExternal: true,
    })],
  },
  {
    input: "./dist/types.d.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [
      dts(),
    ],
  },
];
