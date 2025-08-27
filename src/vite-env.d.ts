/// <reference types="vite/client" />

// Completely override Node.js types to prevent conflicts
declare module 'fs' {
  // Empty module to prevent Node.js fs types from conflicting
}

declare module 'node:fs' {
  // Empty module to prevent Node.js fs types from conflicting  
}

// Override FSWatcher to match Vite's implementation
declare global {
  namespace NodeJS {
    interface Global {}
  }
}

export {};
