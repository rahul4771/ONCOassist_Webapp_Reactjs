import React from 'react';

interface SwitchButtonProps {
  text: string;
  backgroundColor?: string;
  value: boolean;
  width?: string;
  onChange: (value: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  text,
  backgroundColor = '#ccc',
  value,
  width = '70px',
  onChange,
}) => {
  const toggleSwitch = () => {
    onChange(!value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <label>{text}</label>
      <div
        onClick={toggleSwitch}
        style={{
          width,
          height: '30px',
          backgroundColor,
          borderRadius: '15px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: value ? 'flex-end' : 'flex-start',
          padding: '0 5px',
          transition: 'background-color 0.3s',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: '#fff',
            marginRight: value ? '8px' : 'auto',
            marginLeft: value ? 'auto' : '8px',
            zIndex: 1,
            userSelect: 'none',
          }}
        >
          {value ? 'Yes' : 'No'}
        </span>
        <div
          style={{
            height: '24px',
            width: '24px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '3px',
            left: value ? `calc(${width} - 28px)` : '3px',
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
};

export default SwitchButton;
