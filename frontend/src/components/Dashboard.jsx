import React from 'react';

export default function Dashboard({ materials, loading, onRefresh }) {
  const totalMaterials = materials.length;
  const totalWeight = materials.reduce((acc, m) => acc + m.remainingWeightGrams, 0);

  const getBadgeClass = (type) => {
    if (!type) return 'badge-other';
    const lower = type.toLowerCase();
    if (lower.includes('pla')) return 'badge-pla';
    if (lower.includes('tpu')) return 'badge-tpu';
    if (lower.includes('petg')) return 'badge-petg';
    return 'badge-other';
  };

  const getProgressClass = (percentage) => {
    if (percentage > 50) return 'progress-high';
    if (percentage > 20) return 'progress-medium';
    return 'progress-low';
  };

  return (
    <div className="glass-card">
      <div className="view-title">
        <div>
          <h2>Material Dashboard</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '400', marginTop: '0.25rem' }}>
            Monitor remaining 3D printing filament weights and specifications
          </p>
        </div>
        <button onClick={onRefresh} className="nav-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          🔄 Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Filament Spools</div>
          <div className="stat-val">{totalMaterials}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Remaining Inventory</div>
          <div className="stat-val">{totalWeight.toFixed(1)}g</div>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : materials.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3>No Materials Found</h3>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Start by adding a new material spool from the navigation menu above.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Filament Name</th>
                <th>Material Type</th>
                <th>Color</th>
                <th>Remaining Weight</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => {
                // Assuming standard spool size is 1000g for gauge percentage calculation
                const maxSpoolWeight = 1000.0;
                const percentage = Math.min((material.remainingWeightGrams / maxSpoolWeight) * 100, 100);

                return (
                  <tr key={material.id}>
                    <td>#{material.id}</td>
                    <td style={{ fontWeight: '500' }}>{material.name}</td>
                    <td>
                      <span className={`badge ${getBadgeClass(material.type)}`}>
                        {material.type}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span 
                          style={{ 
                            display: 'inline-block', 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '50%', 
                            backgroundColor: material.color.toLowerCase(),
                            border: '1px solid rgba(255,255,255,0.2)' 
                          }}
                        />
                        {material.color}
                      </div>
                    </td>
                    <td>
                      <div className="progress-container">
                        <div className="progress-bar-wrapper">
                          <div 
                            className={`progress-bar-fill ${getProgressClass(percentage)}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span style={{ fontSize: '0.85rem', minWidth: '4.5rem', textAlign: 'right', fontWeight: '500' }}>
                          {material.remainingWeightGrams.toFixed(1)}g
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
