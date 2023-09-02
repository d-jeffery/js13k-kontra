// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import kontra from 'rollup-plugin-kontra'
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

const closureOptions = {
    compilationLevel: 'ADVANCED',
    languageOut: 'ECMASCRIPT_2021',
    warningLevel: 'VERBOSE',
}

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [typescript(),
        // kontra({
        //     gameObject: {
        //         group: true,
        //     },
        //     debug: true
        // }),
        nodeResolve(),
        commonjs({
           defaultIsModuleExports: true
        }),
        terser(),]
};