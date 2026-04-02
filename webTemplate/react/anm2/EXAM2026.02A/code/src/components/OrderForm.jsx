import React, { useState, useEffect } from 'react';

const initialForm = {
  scholarshipName: '', phone: '', sponsor: '', value: '', quantity: 1, price: '', status: '', deadline: ''
};

const OrderForm = ({ orderToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (orderToEdit) {
      setFormData(orderToEdit);
    } else {
      setFormData(initialForm);
    }
  }, [orderToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.scholarshipName || formData.scholarshipName.length < 2 || formData.scholarshipName.length > 50) {
      newErrors.scholarshipName = 'Name is not taller than 50 char';
    }
    
    
    if (formData.deadline && formData.deadline < today) {
      newErrors.deadline = 'error';
    }
    
    
    if (!formData.sponsor) newErrors.sponsor = 'Empty';
    if (!formData.value) newErrors.value = 'Empty';
    
    if (!formData.deadline) newErrors.deadline = 'Empty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      if (!orderToEdit) {
        setFormData(initialForm);
      }
    } else {
      onSubmit(null, true);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="card shadow-sm border border-light-subtle rounded-3 mb-4 bg-white">
      <div className="card-body p-4">
        <h5 className="fs-5 fw-bold text-dark mb-4">Add new scholarship</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-secondary mb-1" style={{ fontSize: '0.9rem' }}>scholarshipName</label>
              <input type="text" className={`form-control ${errors.scholarshipName ? 'is-invalid' : ''}`} name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} placeholder="Program Title" />
              {errors.scholarshipName && <div className="invalid-feedback">{errors.scholarshipName}</div>}
            </div>
            
            <div className="col-md-6">
              <label className="form-label text-secondary mb-1" style={{ fontSize: '0.9rem' }}>Sponsor</label>
              <input type="text" className={`form-control ${errors.sponsor ? 'is-invalid' : ''}`} name="sponsor" value={formData.sponsor} onChange={handleChange} placeholder="Company / foundation" />
              {errors.sponsor && <div className="invalid-feedback">{errors.sponsor}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label text-secondary mb-1" style={{ fontSize: '0.9rem' }}>Value(USD)</label>
              <input type="text" className={`form-control ${errors.value ? 'is-invalid' : ''}`} name="value" value={formData.value} onChange={handleChange} placeholder="e.g. 1200" />
              {errors.value && <div className="invalid-feedback">{errors.value}</div>}
            </div>
            
            <div className="col-md-6">
              <label className="form-label text-secondary mb-1" style={{ fontSize: '0.9rem' }}>Email</label>
              <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} placeholder="contact@example.com" />
              {errors.value && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            
            <div className="col-md-6">
              <label className="form-label text-secondary mb-1" style={{ fontSize: '0.9rem' }}>Deadline</label>
              <input type="date" className={`form-control ${errors.deadline ? 'is-invalid' : ''}`} name="deadline" value={formData.deadline} onChange={handleChange} />
              {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}
            </div>
          </div>

         

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-primary px-3" onClick={handleSubmit}>Save</button>
            <button type="button" className="btn btn-primary px-3" onClick={handleReset}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
