import React from 'react';

/**
 * change this
 */
export namespace ApplicationContext {
  export interface KiraConfig {
    colors: {
      font: string;
    };
  }

  interface ProviderProps {
    children: React.ReactNode;
    config: KiraConfig;
  }

  const context = React.createContext<KiraConfig | undefined>(undefined);

  /**
   * provider
   */
  export function provider({ children, config }: ProviderProps) {
    if (!config) throw new Error('application provider must accept a config');

    return <context.Provider value={config}>{children}</context.Provider>;
  }

  /**
   * use
   */
  export function use() {
    const ctx = React.useContext(context);

    if (ctx === undefined) {
      throw new Error('ApplicationContext.use must be used within a ApplicationContext.provider');
    }

    return ctx;
  }
}
