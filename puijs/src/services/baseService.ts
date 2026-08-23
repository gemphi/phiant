import { EventEmitter } from './eventEmitter';
import { ServiceLifecycle } from './types';

export abstract class BaseService extends EventEmitter implements ServiceLifecycle {
  protected isInitialized = false;
  protected isDisposed = false;

  abstract readonly name: string;

  async init(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.emit('init');
  }

  async dispose(): Promise<void> {
    if (this.isDisposed) return;
    this.isDisposed = true;
    this.emit('dispose');
    this.clear();
  }

  protected log(message: string, ...args: any[]): void {
    console.log(`[PUI Service: ${this.name}] ${message}`, ...args);
  }

  protected error(message: string, error?: any): void {
    console.error(`[PUI Service Error: ${this.name}] ${message}`, error);
    this.emit('error', { message, error });
  }
}
