import React from 'react';

const OrderItem = ({ order, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return 'bg-warning text-dark';
      case 'confirmed': return 'bg-info text-dark';
      case 'shipped': return 'bg-primary text-white';
      case 'delivered': return 'bg-success text-white';
      default: return 'bg-secondary text-white';
    }
  };

 

 

  return (
    <tr>
      
      <td className="fw-semibold">{order.scholarshipName}</td>
      <td className="fw-semibold">{order.sponsor}</td>
      <td className="fw-semibold">{order.value}</td>
      <td className="fw-semibold">{order.email}</td>
      <td className="fw-semibold">{order.deadline}</td>

      
      
      
    </tr>
  );
};

export default OrderItem;
