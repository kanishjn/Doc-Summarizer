import React from 'react';

const Card = (props) => {
  const handleRedirect = () => {
    if (props.details.redirectUrl) {
      window.open(props.details.redirectUrl, '_self');
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.1)',
      maxWidth: '320px',
      height:'95%',
      width: '100%',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      margin: '15px'
    }}
    
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.1)';
    }}>
      
      <div style={{
        background: `linear-gradient(135deg, ${props.details.bgColor} 0%, ${props.details.bgColor}dd 100%)`,
        padding: '32px 24px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <span style={{
            fontSize: '28px'
          }}>{props.details.icon}</span>
        </div>
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '20px',
          fontWeight: '600'
        }}>{props.details.title}</h3>
        <p style={{
          margin: '0',
          fontSize: '14px',
          opacity: '0.9',
          lineHeight: '1.4'
        }}>{props.details.description}</p>
      </div>

      <div style={{ padding: '24px' }}>
        {props.details.features.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{
              margin: '0 0 12px 0',
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Key Features</h4>
            
            {props.details.features.map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 0',
                fontSize: '14px',
                color: '#4b5563'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: props.details.bgColor,
                  marginRight: '12px',
                  flexShrink: 0
                }}></div>
                {feature}
              </div>
            ))}
          </div>
        )}

        <div style={{
          textAlign: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button onClick={handleRedirect} style={{
            backgroundColor: '#f9fafb',
            color: '#374151',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            border: '1px solid #e5e7eb',
            cursor:"pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = props.details.bgColor;
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = props.details.bgColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.color = '#374151';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}>
            Try Now
            <span style={{ fontSize: '12px' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card