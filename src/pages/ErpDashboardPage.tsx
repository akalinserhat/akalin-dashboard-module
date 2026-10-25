import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDashboardService } from '../adapters/DashboardServiceContext';
import type { DashboardStatCard, DashboardUserData } from '../types';
import '../styles/dashboard.css';

export function ErpDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const adapter = useDashboardService();

  const [userData, setUserData] = useState<DashboardUserData>({ name: '', companyName: '' });
  const [stats, setStats] = useState<DashboardStatCard[]>([]);

  useEffect(() => {
    if (adapter.getUserData) {
      const res = adapter.getUserData();
      if (res instanceof Promise) {
        res.then(setUserData).catch(() => {});
      } else {
        setUserData(res);
      }
    }

    if (adapter.getStats) {
      const res = adapter.getStats();
      if (res instanceof Promise) {
        res.then(setStats).catch(() => {});
      } else {
        setStats(res);
      }
    }
  }, [adapter]);

  return (
    <div className="erp-dashboard-container">
      <div className="base-dashboard-header">
        <div>
          <h1 className="base-dashboard-title">
            {t('dashboard.welcome_user', 'Hoş Geldin, {{name}}', { name: userData.name || '' })}
          </h1>
          <p className="base-dashboard-subtitle">
            {t('dashboard.greeting_subtitle', '{{firma}} için bugün işler nasıl gidiyor?', {
              firma: userData.companyName || ''
            })}
          </p>
        </div>
        <button
          type="button"
          id="btnDashboardYeniSatis"
          className="btn btn-primary"
          onClick={() => {
            if (adapter.onQuickActionClick) {
              adapter.onQuickActionClick('new_sale', navigate);
            } else {
              navigate('/siparisler/teklif/yeni');
            }
          }}
        >
          {t('auto_yeni_satis_75c7', 'Yeni Satış')}
        </button>
      </div>

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

export default ErpDashboardPage;
