import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import validate, { getUpdatedData } from '../utils.js';
import { middlewareUpdatedProduct } from '../middlewares/products.js';
import EditFormInput from './EditFormInput.jsx';
import styles from '../styles/ItemPage.module.css';
import formStyles from '../styles/EditForm.module.css';

const EditForm = ({ data, toggleEditForm }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const [valResult, setValResult] = useState(null);
  const handleForm = (e) => {
    e.preventDefault();
    const values = new FormData(formRef.current);
    const validatedData = validate(values);
    setValResult(validatedData);
    if (Object.values(validatedData).every((val) => val.isValid)) {
      const updatedData = getUpdatedData(validatedData);
      const newProductData = { ...data, ...updatedData }
      dispatch(middlewareUpdatedProduct(newProductData));
    }
  };

  return (
    <form onSubmit={handleForm} ref={formRef} className={styles.main}>
    <div className={styles.top}>
      <img className={styles.image} src={data.picture} alt="Обложка книги" />
      <div className={formStyles.info}>
        <EditFormInput name="name" type="text" label="Название" data={valResult && valResult.name}/>
        <EditFormInput name="author" type="text" label="Автор" data={valResult && valResult.author}/>
        <EditFormInput name="price" type="number" label="Цена" data={valResult && valResult.price}/>
        <EditFormInput name="inStock" type="number" label="В наличии" data={valResult && valResult.inStock}/>
        <div className={formStyles.btnGroup}>
          <button className={formStyles.cancel} onClick={toggleEditForm}>Отмена</button>
          <button className={formStyles.send} type="submit">Сохранить</button>
        </div>
      </div>
    </div>
    <label htmlFor="description">Описание</label>
    <textarea
      id="description"
      name="description"
      type="text"
      className={valResult && !valResult.description.isValid ? formStyles.invalidInput : formStyles.validInput}
    ></textarea>
    {valResult && !valResult.description.isValid && <div className={formStyles.invalid}>{valResult.description.message}</div>}
  </form>
  );
};

export default EditForm;
