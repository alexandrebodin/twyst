import pkg from './package.json';

export default {
  input: 'src/twyst.js',
  output: [
    {
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      name: 'twyst'
    },
    {
      exports: 'named',
      file: pkg.module,
      format: 'es',
      name: 'twyst'
    }
  ]
};
