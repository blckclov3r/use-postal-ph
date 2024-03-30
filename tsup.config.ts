import {defineConfig} from 'tsup';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: true,
    clean: true,
    minify: "terser",
    keepNames: true,
    treeshake: true,
    splitting: false,
    target: 'es5',
    outDir: './dist',
    terserOptions: {
        mangle: true,
        compress: true,
        ecma: 5,
    },
});