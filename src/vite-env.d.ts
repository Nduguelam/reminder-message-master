/// <reference types="vite/client" />

// Override for rollup parseAst module resolution issue
declare module 'rollup/parseAst' {
  export * from 'rollup';
}

// Global type augmentations
declare global {
  var global: typeof globalThis;
}

export {};
