import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDashboardService } from '../adapters/DashboardServiceContext';
import type { DashboardStatCard } from '../types';
import '../styles/dashboard.css';

export function AdminDashboardPage() {
  const { t } = useTranslation();
  const adapter = useDashboardService();

  const [stats, setStats] = useState<DashboardStatCard[]>([
    { id: 'users', title: 'Aktif Kullanıcılar', value: 24 },
    { id: 'roles', title: 'Tanımlı Roller', value: 5 },
    { id: 'health', title: 'Sistem Sağlığı', value: '%99.9', trend: 'success' }
  ]);

  useEffect(() => {
    if (adapter.getStats) {
      const res = adapter.getStats();
      if (res instanceof Promise) {
        res.then(setStats).catch(() => {});
      } else if (res && res.length > 0) {
        setStats(res);
      }
    }
  }, [adapter]);

  return (
    <div className="admin-dashboard-container">
      <h1 className="base-dashboard-title" style={{ marginBottom: '4px' }}>
        {t('dashboard.welcome_admin', 'Hoş Geldiniz, Admin')}
      </h1>
      <p className="base-dashboard-subtitle" style={{ marginBottom: '32px' }}>
        {t('dashboard.admin_subtitle', 'Sistem genel durumunu ve son etkinlikleri buradan izleyebilirsiniz.')}
      </p>

      <div className="dashboard-stats-grid">
        {stats.map(card => (
          <div key={card.id} className="dashboard-stat-card">
            <div className="dashboard-stat-title">{card.title}</div>
            <div className="dashboard-stat-value">{card.value}</div>
            {card.subtitle && (
              <div className={`dashboard-stat-subtitle ${card.trend || 'neutral'}`}>
                {card.subtitle}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
