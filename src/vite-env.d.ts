/// <reference types="vite/client" />

// Fix for Vite 5.x rollup/parseAst module resolution
declare module 'rollup/parseAst' {
  export * from 'rollup';
}

export {};
