import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

export default {
    input: "lib/index.ts",
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
        name: "ReactCacheRouter"
    },
    external: [
        'react',
        'react-router-dom'
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        typescript({
            useTsconfigDeclarationDir: true
        }),
        resolve({
            // 将自定义选项传递给解析插件
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        })
    ]
}