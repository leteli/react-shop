import React from 'react';
import styles from '../styles/FormInput.module.css';

interface Props {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  error: string | null;
};

const FormInput: React.FC<Props> = ({name, label, placeholder, type, error }) => {
  return (
    <>
    <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className={error && error !== '' ? styles.invalidInput : styles.validInput}
        type={type}
        placeholder={placeholder}
        />
      { error && error !== '' && error !== 'isNotDisplayed' && (
        <div className={styles.error}>{error}</div>
      )}
    </>
  );
};

export default FormInput;
