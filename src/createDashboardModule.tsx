/**
 * @akalin/dashboard_module - Gösterge Paneli Modülü Fabrikası
 */

import React, { lazy, Suspense } from 'react';
import { LayoutDashboard } from 'lucide-react';
import type { IModuleDefinition } from '@akalin/module_core';
import type { DashboardModuleOptions } from './types';
import {
  DashboardServiceProvider,
  defaultDashboardAdapter
} from './adapters/DashboardServiceContext';

const LazyErpDashboardPage = lazy(() => import('./pages/ErpDashboardPage'));
const LazyAdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

export function createDashboardModule(
  options: DashboardModuleOptions = {}
): IModuleDefinition & { components: any } {
  const adapter = options.adapter || defaultDashboardAdapter;
  const isadmin = options.variant === 'admin';
  const TargetComponent = isadmin ? LazyAdminDashboardPage : LazyErpDashboardPage;

  const withProvider = (Component: React.ComponentType<any>, props: any = {}) => {
    return React.createElement(
      DashboardServiceProvider,
      { adapter },
      React.createElement(
        Suspense,
        { fallback: React.createElement('div', { className: 'p-16 text-muted' }, 'Yükleniyor...') },
        React.createElement(Component, props)
      )
    );
  };

  const moduleDef: IModuleDefinition & { components: any } = {
    id: options.id || 'dashboard',
    title: options.title || 'Gösterge Paneli',
    icon: options.icon || React.createElement(LayoutDashboard, { size: 20 }),
    iconName: 'LayoutDashboard',
    order: options.order ?? 1,
    isCore: true,
    routes: [
      {
        path: '/',
        element: withProvider(TargetComponent),
        title: options.title || 'Gösterge Paneli'
      }
    ],
    menuItems: [
      {
        id: isadmin ? 'menu_dashboard' : 'dashboard-item',
        label: options.title || 'Gösterge Paneli',
        path: '/',
        icon: options.icon || React.createElement(LayoutDashboard, { size: 20 }),
        order: options.order ?? 1
      }
    ],
    components: {
      DashboardPage: TargetComponent,
      Dashboard: TargetComponent,
      ErpDashboardPage: LazyErpDashboardPage,
      AdminDashboardPage: LazyAdminDashboardPage
    }
  };

  return moduleDef;
}

export const DashboardModuleDefinition = createDashboardModule();
export const DashboardModule = DashboardModuleDefinition;
export const AdminDashboardModule = createDashboardModule({ variant: 'admin', order: 10 });
export default DashboardModuleDefinition;
