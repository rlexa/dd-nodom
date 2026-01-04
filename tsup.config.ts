import {defineConfig} from 'tsup';

export default defineConfig({
  entry: {fp: 'src/fp/index.ts', array: 'src/array/index.ts', str: 'src/str/index.ts', common: 'src/common/index.ts'},
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
});
