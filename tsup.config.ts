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
            reserved: ['require', 'exports', 'module', 'define'],
        },
        compress: {
            passes: 2,
            drop_console: true,
            drop_debugger: true,
            pure_getters: true,
            unsafe_comps: true,
            booleans: true,
            conditionals: true,
            sequences: true,
            dead_code: true,
            unused: true,
            arguments: true,
            evaluate: true,
            join_vars: true,
            if_return: true,
            defaults: true,
        },
        ecma: 5,
    },
});
