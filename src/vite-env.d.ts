/// <reference types="vite/client" />

// Fix for Vite 7.x rollup/parseAst module resolution
declare module 'rollup/parseAst' {
  export * from 'rollup';
}

export {};
