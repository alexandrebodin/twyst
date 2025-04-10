import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
import { execSync } from 'child_process';

const plugins = [
  {
    name: 'typings',
    buildStart() {
      execSync('tsc ', {
        stdio: 'inherit',
      });
    },
  },
  nodeResolve({
    extensions: ['.ts'],
  }),
  commonjs({
    ignoreDynamicRequires: true,
  }),
  swc(),
];

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      entryFileNames: '[name].js',
      chunkFileNames: '[name].[hash].js',
      dir: 'dist',
      format: 'cjs',
    },
    {
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name].[hash].mjs',
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins,
});
