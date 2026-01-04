import {defineConfig} from 'tsup';

export default defineConfig({
  entry: {fp: 'src/fp/index.ts'},
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
});
