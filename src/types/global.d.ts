// Type declarations for rollup parseAst module resolution
declare module 'rollup/parseAst' {
  export { parseAst } from 'rollup';
  export * from 'rollup';
}

// Ambient module declaration
declare module 'rollup' {
  export function parseAst(code: string, options?: any): any;
}