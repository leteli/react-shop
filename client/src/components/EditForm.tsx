import React, { useState, useRef, SyntheticEvent } from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import validate, { getUpdatedData } from '../utils';
import { middlewareUpdatedProduct } from '../middlewares/products';
import EditFormInput from './EditFormInput';
import styles from '../styles/ItemPage.module.css';
import formStyles from '../styles/EditForm.module.css';

import { IProductData } from '../interfaces/interfaces';
import { ValidatedForm } from '../types/validation';

interface Props {
  data: IProductData;
  toggleEditForm: () => void;
};

const EditForm: React.FC<Props> = ({ data, toggleEditForm }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [valResult, setValResult] = useState<ValidatedForm | null>(null);

  const handleForm = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formRef.current) {
      throw new Error('DOM элемент не найден!');
    }
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
      className={valResult && !valResult.description.isValid ? formStyles.invalidInput : formStyles.validInput}
    ></textarea>
    {valResult && !valResult.description.isValid && <div className={formStyles.invalid}>{valResult.description.message}</div>}
  </form>
  );
};

export default EditForm;
