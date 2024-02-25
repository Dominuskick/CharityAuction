import React from 'react';
import styles from './labeledInput.module.css';
import InputMask from 'react-input-mask';

const index = ({
  label,
  type,
  placeholder,
  value,
  setValue,
  onlyLetters,
  onlyLatinAndNumbers,
  maxLength = 50,
  error,
}) => {
  return (
    <div className={`${styles.inputWrapper} ${error && styles.error}`}>
      <div className={styles.line}>
        <label>{label}</label>
        <label className={styles.error}>{error}</label>
      </div>
      {type === 'tel' ? (
        <InputMask
          mask="+38 (099) 999-99-99"
          maskChar="_"
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) =>
            onlyLetters
              ? handleOnlyLettersInput(e.target.value, setValue)
              : type === 'email'
              ? handleEmailInput(e.target.value, setValue)
              : type === 'password' || onlyLatinAndNumbers
              ? handleOnlyLatinAndNumbersInput(e.target.value, setValue)
              : setValue(e.target.value)
          }
        />
      )}
    </div>
  );
};

export default index;

const handleOnlyLettersInput = (value, setValue) => {
  const regex = /^[а-яА-ЯёЁіІїЇєЄґҐa-zA-Z]+$/;

  if (regex.test(value) || value === '') {
    setValue(value);
  }
};

const handleEmailInput = (value, setValue) => {
  const emailRegex = /^[a-zA-Z0-9._%+-@]+$/;

  if (emailRegex.test(value) || value === '') {
    setValue(value);
  }
};

const handleOnlyLatinAndNumbersInput = (value, setValue) => {
  const emailRegex = /^[a-zA-Z0-9]+$/;

  if (emailRegex.test(value) || value === '') {
    setValue(value);
  }
};
