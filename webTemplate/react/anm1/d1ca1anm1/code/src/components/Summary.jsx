import React from 'react';

function Summary({ total, avg }) {
    return (
        <div style={{
            background: 'linear-gradient(to right, #ff4e50, #00c9ff)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
            Tổng số sinh viên: {total} <span style={{ margin: '0 15px' }}>|</span> Điểm TB lớp: {avg}
        </div>
    );
}

export default Summary;
