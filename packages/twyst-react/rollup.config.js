import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/twyst.js',
  output: [
    {
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      name: 'react-twyst'
    },
    {
      exports: 'named',
      file: pkg.module,
      format: 'es',
      name: 'react-twyst'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
