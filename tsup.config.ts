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
        mangle: {
            toplevel: true,
        },
        compress: {
            passes: 2,
            drop_console: true,
            drop_debugger: true
        },
        ecma: 5,
    },
});