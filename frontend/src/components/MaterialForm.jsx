import React, { useState } from 'react';

export default function MaterialForm({ onMaterialCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'PLA+',
    color: '',
    remainingWeightGrams: ''
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
    if (!formData.name || !formData.color || !formData.remainingWeightGrams) {
      setNotification({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          color: formData.color,
          remainingWeightGrams: parseFloat(formData.remainingWeightGrams)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add material');
      }

      setNotification({
        type: 'success',
        message: `Successfully added material "${formData.name}"!`
      });

      // Clear form
      setFormData({
        name: '',
        type: 'PLA+',
        color: '',
        remainingWeightGrams: ''
      });

      // Trigger update on parent
      if (onMaterialCreated) {
        onMaterialCreated();
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
          <h2>Add Filament Spool</h2>
          <div className="form-subtitle">Register a new filament spool in the tracker system</div>
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
          <label htmlFor="name">Spool Name/Brand *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="e.g. Overture PLA White / Prusament PETG Orange"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Material Type *</label>
          <select
            id="type"
            name="type"
            className="form-control"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="PLA">PLA</option>
            <option value="PLA+">PLA+</option>
            <option value="TPU">TPU</option>
            <option value="PETG">PETG</option>
            <option value="ABS">ABS</option>
            <option value="Nylon">Nylon</option>
            <option value="ASA">ASA</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="color">Color *</label>
          <input
            type="text"
            id="color"
            name="color"
            className="form-control"
            placeholder="e.g. Red, Galaxy Black, Transparent Orange"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="remainingWeightGrams">Remaining Weight (grams) *</label>
          <input
            type="number"
            step="0.1"
            id="remainingWeightGrams"
            name="remainingWeightGrams"
            className="form-control"
            placeholder="e.g. 1000.0 (New Spool)"
            value={formData.remainingWeightGrams}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          disabled={submitting}
        >
          {submitting ? 'Registering...' : 'Add Material'}
        </button>
      </form>
    </div>
  );
}
