import React, { useState, useRef, SyntheticEvent } from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import validate, { getUpdatedData } from '../utils';
import { middlewareUpdatedProduct } from '../middlewares/products';
import FormInput from './FormInput';
import styles from '../styles/ItemPage.module.css';
import form from '../styles/EditForm.module.css';
import input from '../styles/FormInput.module.css';

import { IProductData } from '../interfaces/interfaces';
import { ValidatedForm, ValidForm } from '../types/validation';

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
    const formData = new FormData(formRef.current);
    const entries = Array.from(formData.entries());
    const validatedData = validate(entries as Array<[string, string]>);
    setValResult(validatedData);
    if (Object.values(validatedData).every((val) => val.isValid)) {
      const updatedData = getUpdatedData(validatedData as ValidForm);
      const newProductData = { ...data, ...updatedData }
      dispatch(middlewareUpdatedProduct(newProductData));
      toggleEditForm();
    }
  };

  return (
    <form onSubmit={handleForm} ref={formRef} className={styles.main} data-testid={`edit-form-${data.id}`}>
    <div className={styles.top}>
      <img className={styles.image} src={data.picture} alt="Обложка книги" />
      <div className={form.info}>
        <FormInput
          name="name"
          type="text"
          label="Название"
          placeholder="Введите название книги"
          error={valResult && valResult.name.error}
        />
        <FormInput
          name="author"
          type="text"
          label="Автор"
          placeholder="Введите автора книги"
          error={valResult && valResult.author.error}
        />
        <FormInput
          name="price"
          type="number"
          label="Цена"
          placeholder="Введите цену"
          error={valResult && valResult.price.error}
        />
        <FormInput
          name="inStock"
          type="number"
          label="В наличии"
          placeholder="Введите количество товара"
          error={valResult && valResult.inStock.error}
        />
        <div className={form.btnGroup}>
          <button className={form.cancel} onClick={toggleEditForm} data-testid="cancel-edit-btn">Отмена</button>
          <button className={form.send} type="submit" data-testid="save-edit-btn">Сохранить</button>
        </div>
      </div>
    </div>
    <label htmlFor="description">Описание</label>
    <textarea
      id="description"
      name="description"
      className={valResult && !valResult.description.isValid ? input.invalidInput : input.validInput}
    ></textarea>
    {valResult && valResult.description.error !== '' && (
      <div className={input.error}>{valResult.description.error}</div>
    )}
  </form>
  );
};

export default EditForm;
