import { useMemo } from 'react';
import { ServiceIdentifier } from '../services/types';
import { useServiceContainer } from '../services/ServiceProvider';

export function useService<T>(identifier: ServiceIdentifier<T>): T {
  const container = useServiceContainer();
  return useMemo(() => container.resolve<T>(identifier), [container, identifier]);
}
