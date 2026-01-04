import {defineConfig} from 'tsup';

export default defineConfig({
  entry: {
    array: 'src/array/index.ts',
    common: 'src/common/index.ts',
    date: 'src/date/index.ts',
    fp: 'src/fp/index.ts',
    str: 'src/str/index.ts',
  },
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'lib',
});
