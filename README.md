# @akalin/dashboard_module

Webakus SaaS ve ERP ekosistemi için bağımsız Gösterge Paneli (Dashboard) Modül Paketi.

## Özellikler

- **Çift Varyant**: ERP ve Admin panoları için optimize edilmiş `ErpDashboardPage` ve `AdminDashboardPage` görünümleri.
- **Soyutlanmış Servis Mimarisi**: `IDashboardAdapter` ile dinamik kullanıcı karşılama ve istatistik kartları.
- **@akalin/module_core Uyumu**: `IModuleDefinition` ve `createDashboardModule` ile dinamik modül kaydı ve anasayfa (`/`) rotası.

## Kurulum

```bash
npm install @akalin/dashboard_module
```

## Kullanım

```tsx
import { createDashboardModule } from '@akalin/dashboard_module';
import { ModuleRegistry } from '@akalin/module_core';

const dashboardModule = createDashboardModule();
ModuleRegistry.register(dashboardModule);
```
