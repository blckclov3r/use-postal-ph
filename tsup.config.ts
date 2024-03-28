import {defineConfig} from 'tsup';

const config = defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: true,
    clean: true,
    minify: "terser",
    treeshake: true,
    terserOptions: {
        mangle: true,
        compress: true,
    },
});
export default config;
