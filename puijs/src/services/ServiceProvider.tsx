import React, { createContext, useContext, useEffect, useMemo, ReactNode } from 'react';
import { IServiceContainer } from './types';
import { ServiceContainer, defaultContainer } from './serviceContainer';

const ServiceContext = createContext<IServiceContainer>(defaultContainer);

export interface ServiceProviderProps {
  container?: IServiceContainer;
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ container, children }) => {
  const activeContainer = useMemo(() => container || new ServiceContainer(), [container]);

  useEffect(() => {
    return () => {
      if (container !== defaultContainer) {
        activeContainer.dispose().catch(console.error);
      }
    };
  }, [activeContainer, container]);

  return <ServiceContext.Provider value={activeContainer}>{children}</ServiceContext.Provider>;
};

export const useServiceContainer = (): IServiceContainer => {
  return useContext(ServiceContext);
};
