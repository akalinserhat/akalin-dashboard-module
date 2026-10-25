import { ReactNode } from 'react';

export interface DashboardStatCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'success' | 'warning' | 'danger' | 'neutral';
  icon?: ReactNode;
}

export interface DashboardUserData {
  name: string;
  companyName?: string;
  role?: string;
}

export interface IDashboardAdapter {
  getUserData?(): Promise<DashboardUserData> | DashboardUserData;
  getStats?(): Promise<DashboardStatCard[]> | DashboardStatCard[];
  onQuickActionClick?(actionId: string, navigate: any): void;
}

export interface DashboardModuleOptions {
  id?: string;
  title?: string;
  variant?: 'erp' | 'admin';
  order?: number;
  icon?: ReactNode;
  adapter?: IDashboardAdapter;
}
