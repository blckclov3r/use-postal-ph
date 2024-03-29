import {defineConfig} from 'tsup';

const config = defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: true,
    clean: true,
    minify: "terser",
    keepNames: true,
    treeshake: true,
    splitting: false,
    terserOptions: {
        mangle: true,
        compress: true,
        ecma: 2020,
    },
});
export default config;
