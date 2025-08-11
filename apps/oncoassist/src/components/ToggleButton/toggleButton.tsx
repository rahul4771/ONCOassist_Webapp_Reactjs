import styles from './toggleButton.module.scss';
// ToggleButton.tsx
interface ToggleButtonProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  width?: string;
  yesLabel: string;
  noLabel: string;
  id?: string;
  name?: string;
  className?:string;
}

// const ToggleButton: React.FC<ToggleButtonProps> = ({
//   value,
//   onChange,
//   width = '120px',
//   yesLabel,
//   noLabel,
//   id,
//   name,
//   className
// }) => {
//   return (
//     <div
//       id={id}
//       className={`toggle-wrapper ${className ?? ''}`}
//       style={{
//         display: 'flex',
//         borderRadius: '6px',
//         overflow: 'hidden',
//         backgroundColor: '#eee',
//         border: '1px solid #ccc',
//       }}
//     >
//       <button
//         type="button"
//         name={name}
//         onClick={() => onChange(false)}
//         className={styles.toggleButton}
//         style={{
//           flex: 1,
//           padding: '6px 12px',
//           backgroundColor: value === false ? '#fff' : '#eee',
//           fontWeight: value === false ? '600' : '400',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         {noLabel}
//       </button>
//       <div style={{ width: '1px', backgroundColor: '#ccc' }} />
//       <button
//         type="button"
//         className={styles.toggleButton}
//         name={name}
//         onClick={() => onChange(true)}
//         style={{
//           flex: 1,
//           padding: '6px 12px',
//           backgroundColor: value === true ? '#fff' : '#eee',
//           fontWeight: value === true ? '600' : '400',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         {yesLabel}
//       </button>
//     </div>
//   );
// };
const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  onChange,
  width = '120px',
  yesLabel,
  noLabel,
  id,
  name,
  className
}) => {
  return (
    <div
      id={id}
      className={`toggle-wrapper ${className ?? ''}`}
      style={{
        display: 'flex',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: '#eee',
        border: '2px solid #55C1E8',
      }}
    >
      <button
        type="button"
        name={name}
        onClick={() => onChange(false)}
        className={styles.toggleButton}
        style={{
          flex: 1,
          padding: '6px 12px',
          backgroundColor: value === false ? '#55C1E8' : '#eee',
          fontWeight: value === false ? '600' : '400',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {noLabel}
      </button>
      <div style={{ width: '1px', backgroundColor: '#ccc' }} />
      <button
        type="button"
        className={styles.toggleButton}
        name={name}
        onClick={() => onChange(true)}
        style={{
          flex: 1,
          padding: '6px 12px',
          backgroundColor: value === true ? '#55C1E8' : '#eee',
          fontWeight: value === true ? '600' : '400',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {yesLabel}
      </button>
    </div>
  );
};

export default ToggleButton;
// , FsToggleButton };
