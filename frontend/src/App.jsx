import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import PrintJobForm from './components/PrintJobForm';
import MaterialForm from './components/MaterialForm';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/materials');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setMaterials(data);
    } catch (err) {
      console.error('Failed to fetch materials:', err);
      setError('Could not connect to the backend server. Please verify the Spring Boot app is running on localhost:8080.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🎛️</span>
          <span>Material Tracker</span>
        </div>
        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('dashboard');
              fetchMaterials();
            }}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'add-material' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-material')}
          >
            ➕ Add Material
          </button>
          <button 
            className={`nav-btn ${activeTab === 'log-job' ? 'active' : ''}`}
            onClick={() => setActiveTab('log-job')}
          >
            🖨️ Log Print Job
          </button>
        </nav>
      </header>

      <main className="main-content">
        {error && (
          <div className="notification notification-error" style={{ maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            materials={materials} 
            loading={loading} 
            onRefresh={fetchMaterials} 
          />
        )}

        {activeTab === 'add-material' && (
          <MaterialForm 
            onMaterialCreated={fetchMaterials} 
          />
        )}

        {activeTab === 'log-job' && (
          <PrintJobForm 
            materials={materials} 
            onPrintJobCreated={fetchMaterials} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
