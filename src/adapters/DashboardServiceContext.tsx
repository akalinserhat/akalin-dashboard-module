import React, { createContext, useContext, ReactNode } from 'react';
import type { IDashboardAdapter, DashboardStatCard, DashboardUserData } from '../types';

export const defaultDashboardAdapter: IDashboardAdapter = {
  getUserData: () => ({
    name: 'Kullanıcı',
    companyName: 'Webakus ERP'
  }),
  getStats: () => [
    {
      id: 'sales',
      title: 'Toplam Satış',
      value: '₺124,500',
      subtitle: '%12.5 geçen aya göre',
      trend: 'success'
    },
    {
      id: 'campaigns',
      title: 'Aktif Kampanyalar',
      value: '8',
      subtitle: '2 bitmek üzere',
      trend: 'neutral'
    },
    {
      id: 'quotes',
      title: 'Bekleyen Teklifler',
      value: '15',
      subtitle: 'Onay bekliyor',
      trend: 'warning'
    },
    {
      id: 'stock',
      title: 'Kritik Stok',
      value: '24',
      subtitle: 'Ürün inceleme istiyor',
      trend: 'danger'
    }
  ]
};

const DashboardServiceContext = createContext<IDashboardAdapter>(defaultDashboardAdapter);

export interface DashboardServiceProviderProps {
  adapter?: IDashboardAdapter;
  children?: ReactNode;
}

export const DashboardServiceProvider: React.FC<DashboardServiceProviderProps> = ({
  adapter = defaultDashboardAdapter,
  children
}) => {
  return (
    <DashboardServiceContext.Provider value={adapter}>
      {children}
    </DashboardServiceContext.Provider>
  );
};

export const useDashboardService = (): IDashboardAdapter => {
  return useContext(DashboardServiceContext) || defaultDashboardAdapter;
};
