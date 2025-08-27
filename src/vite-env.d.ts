/// <reference types="vite/client" />

// Fix for Vite's rollup parseAst import issue
declare module 'rollup/parseAst' {
  export * from 'rollup';
}

// Global type augmentations
declare global {
  var global: typeof globalThis;
}

export {};
