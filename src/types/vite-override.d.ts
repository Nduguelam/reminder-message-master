/// <reference types="vite/client" />

// Complete type override to resolve FSWatcher conflicts
declare module "vite" {
  namespace Vite {
    interface FSWatcher {
      ref(): this;
      unref(): this;
      addListener(event: string, listener: (...args: any[]) => void): this;
      removeListener(event: string, listener: (...args: any[]) => void): this;
      on(event: string, listener: (...args: any[]) => void): this;
      once(event: string, listener: (...args: any[]) => void): this;
      off(event: string, listener: (...args: any[]) => void): this;
      emit(event: string, ...args: any[]): boolean;
      close(): void;
    }
  }
}

// Override Node.js fs module completely
declare module "fs" {
  interface FSWatcher {
    ref?(): this;
    unref?(): this;
    addListener?(event: string, listener: (...args: any[]) => void): this;
    removeListener?(event: string, listener: (...args: any[]) => void): this;
    on?(event: string, listener: (...args: any[]) => void): this;
    once?(event: string, listener: (...args: any[]) => void): this;
    off?(event: string, listener: (...args: any[]) => void): this;
    emit?(event: string, ...args: any[]): boolean;
    close?(): void;
  }
}

export {};