import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['clsx', 'tailwind-merge', '@floating-ui/dom', '@preact/signals-core'],
  banner: {
    js: '"use client"',
  },
  onSuccess: 'echo "Build completed successfully"',
});