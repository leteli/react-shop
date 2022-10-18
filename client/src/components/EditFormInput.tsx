import React from 'react';
import styles from '../styles/EditForm.module.css';

import { ValidInputData, InvalidInputData } from '../types/validation';


interface Props {
  name: string;
  label: string;
  type: string;
  data: ValidInputData | InvalidInputData | null;
};

const EditFormInput: React.FC<Props> = ({name, label, type, data}) => {
  return (
    <>
    <label htmlFor={name}>{label}</label>
      <input id={name} name={name} className={data && !data.isValid ? styles.invalidInput : styles.validInput} type={type} />
      { data && !data.isValid && <div className={styles.invalid}>{data.message}</div> }
    </>
  );
};

export default EditFormInput;
