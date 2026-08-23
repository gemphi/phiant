export type ServiceIdentifier<T = any> = string | symbol | (new (...args: any[]) => T);

export type ServiceLifetime = 'singleton' | 'transient' | 'scoped';

export interface ServiceLifecycle {
  init?(): Promise<void> | void;
  dispose?(): Promise<void> | void;
}

export interface ServiceDescriptor<T = any> {
  identifier: ServiceIdentifier<T>;
  factory: (container: IServiceContainer) => T;
  lifetime: ServiceLifetime;
  instance?: T;
}

export interface IServiceContainer {
  register<T>(
    identifier: ServiceIdentifier<T>,
    factory: (container: IServiceContainer) => T,
    lifetime?: ServiceLifetime
  ): this;
  registerInstance<T>(identifier: ServiceIdentifier<T>, instance: T): this;
  resolve<T>(identifier: ServiceIdentifier<T>): T;
  has(identifier: ServiceIdentifier): boolean;
  dispose(): Promise<void>;
}
