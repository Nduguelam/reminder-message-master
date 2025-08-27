/// <reference types="vite/client" />

// Override for rollup parseAst module resolution issue
declare module 'rollup/parseAst' {
  export * from 'rollup';
}

// Fix for Vite's rollup parseAst import
declare module 'rollup/parseAst' {
  import type { ParseAst } from 'rollup';
  export const parseAst: ParseAst;
  export * from 'rollup';
}

// Global type augmentations
declare global {
  var global: typeof globalThis;
}

export {};
