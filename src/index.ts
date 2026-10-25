/**
 * @akalin/dashboard_module
 * Webakus SaaS ve ERP ekosistemi için bağımsız Gösterge Paneli Modül Paketi
 */

export * from './types';
export * from './adapters/DashboardServiceContext';
export * from './pages/ErpDashboardPage';
export * from './pages/AdminDashboardPage';
export * from './pages/DashboardPage';
export { DashboardPage, DashboardPage as Dashboard } from './pages/Dashboard';
export * from './createDashboardModule';

import { DashboardModuleDefinition } from './createDashboardModule';
export default DashboardModuleDefinition;
