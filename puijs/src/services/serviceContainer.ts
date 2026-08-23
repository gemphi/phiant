import { IServiceContainer, ServiceIdentifier, ServiceLifetime, ServiceDescriptor } from './types';

export class ServiceContainer implements IServiceContainer {
  private descriptors: Map<ServiceIdentifier, ServiceDescriptor> = new Map();

  register<T>(
    identifier: ServiceIdentifier<T>,
    factory: (container: IServiceContainer) => T,
    lifetime: ServiceLifetime = 'singleton'
  ): this {
    this.descriptors.set(identifier, {
      identifier,
      factory,
      lifetime,
    });
    return this;
  }

  registerInstance<T>(identifier: ServiceIdentifier<T>, instance: T): this {
    this.descriptors.set(identifier, {
      identifier,
      factory: () => instance,
      lifetime: 'singleton',
      instance,
    });
    return this;
  }

  resolve<T>(identifier: ServiceIdentifier<T>): T {
    const descriptor = this.descriptors.get(identifier);
    if (!descriptor) {
      if (typeof identifier === 'function') {
        const instance = new (identifier as new (...args: any[]) => T)();
        this.registerInstance(identifier, instance);
        return instance;
      }
      throw new Error(`[ServiceContainer] Service not registered: ${String(identifier)}`);
    }

    if (descriptor.lifetime === 'singleton') {
      if (!descriptor.instance) {
        descriptor.instance = descriptor.factory(this);
      }
      return descriptor.instance as T;
    }

    return descriptor.factory(this) as T;
  }

  has(identifier: ServiceIdentifier): boolean {
    return this.descriptors.has(identifier);
  }

  async dispose(): Promise<void> {
    for (const descriptor of this.descriptors.values()) {
      if (descriptor.instance && typeof (descriptor.instance as any).dispose === 'function') {
        await (descriptor.instance as any).dispose();
      }
    }
    this.descriptors.clear();
  }
}

export const defaultContainer = new ServiceContainer();
