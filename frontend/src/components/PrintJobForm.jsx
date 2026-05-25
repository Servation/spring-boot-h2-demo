import React, { useState } from 'react';

export default function PrintJobForm({ materials, onPrintJobCreated }) {
  const [formData, setFormData] = useState({
    printName: '',
    weightUsedGrams: '',
    printDurationMinutes: '',
    status: 'COMPLETED',
    materialId: ''
  });

  const [notification, setNotification] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    // Simple validation
    if (!formData.printName || !formData.weightUsedGrams || !formData.printDurationMinutes || !formData.materialId) {
      setNotification({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/print-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          printName: formData.printName,
          weightUsedGrams: parseFloat(formData.weightUsedGrams),
          printDurationMinutes: parseInt(formData.printDurationMinutes, 10),
          status: formData.status,
          materialId: parseInt(formData.materialId, 10)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create print job');
      }

      setNotification({
        type: 'success',
        message: `Successfully created print job "${formData.printName}"! Weight subtracted.`
      });

      // Clear form
      setFormData({
        printName: '',
        weightUsedGrams: '',
        printDurationMinutes: '',
        status: 'COMPLETED',
        materialId: ''
      });

      // Trigger update on parent
      if (onPrintJobCreated) {
        onPrintJobCreated();
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="form-title-bar">
        <div>
          <h2>Log Print Job</h2>
          <div className="form-subtitle">Deduct used weight from selected filament spool inventory</div>
        </div>
      </div>

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span>{notification.type === 'success' ? '✅' : '❌'}</span>
          <span>{notification.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="materialId">Select Filament Spool *</label>
          <select
            id="materialId"
            name="materialId"
            className="form-control"
            value={formData.materialId}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a Material --</option>
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.type} - {m.color}) - {m.remainingWeightGrams.toFixed(1)}g left
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="printName">Print Job Name *</label>
          <input
            type="text"
            id="printName"
            name="printName"
            className="form-control"
            placeholder="e.g. 3D Benchie / Cable Organizer"
            value={formData.printName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="weightUsedGrams">Weight Used (grams) *</label>
          <input
            type="number"
            step="0.01"
            id="weightUsedGrams"
            name="weightUsedGrams"
            className="form-control"
            placeholder="e.g. 15.50"
            value={formData.weightUsedGrams}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="printDurationMinutes">Print Duration (minutes) *</label>
          <input
            type="number"
            id="printDurationMinutes"
            name="printDurationMinutes"
            className="form-control"
            placeholder="e.g. 120"
            value={formData.printDurationMinutes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Print Status *</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="COMPLETED">COMPLETED</option>
            <option value="RUNNING">RUNNING</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          disabled={submitting}
        >
          {submitting ? 'Logging Job...' : 'Log Print Job'}
        </button>
      </form>
    </div>
  );
}
