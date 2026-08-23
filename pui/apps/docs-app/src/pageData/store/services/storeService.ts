import type { StoreData } from '../../types';

/* ---------- Store service registry ---------- */

/**
 * Services provide data by key. A page/section/block says `dataSource: 'youtube.feed'`
 * and the store resolves it to actual props data.
 *
 * Services are registered at app startup. Pages stay pure — they just reference keys.
 */

type ServiceResolver = () => Record<string, any>;

const services: Record<string, ServiceResolver> = {};

export const registerService = (key: string, resolver: ServiceResolver) => {
  services[key] = resolver;
};

export const resolveDataSource = (key: string): Record<string, any> | undefined => {
  const resolver = services[key];
  if (!resolver) return undefined;
  return resolver();
};

export const hasService = (key: string): boolean => key in services;

export const getAllServiceKeys = (): string[] => Object.keys(services);

/* ---------- Bulk register ---------- */

export const registerServices = (data: StoreData) => {
  Object.entries(data).forEach(([key, value]) => {
    services[key] = () => value;
  });
};
