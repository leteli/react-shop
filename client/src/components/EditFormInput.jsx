import styles from '../styles/EditForm.module.css';

const EditFormInput = ({name, label, type, data}) => {
  return (
    <>
    <label htmlFor={name}>{label}</label>
      <input id={name} name={name} className={data && !data.isValid ? styles.invalidInput : styles.validInput} type={type} />
      { data && !data.isValid && <div className={styles.invalid}>{data.message}</div> }
    </>
  );
};

export default EditFormInput;
