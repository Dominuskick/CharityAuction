import React, { useState, useEffect } from 'react';
import styles from './registration.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox, LabeledInput } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '@/utils/constants/routes';
import { registration } from '@/http/userAPI';
import {
  EMAIL_TAKEN_ERROR,
  USERNAME_TAKEN_ERROR_REGEX,
} from '@/utils/constants/backend';

const index = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const [isAdult, setIsAdult] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [nameValidationError, setNameValidationError] = useState('');
  const [surnameValidationError, setSurnameValidationError] = useState('');
  const [emailValidationError, setEmailValidationError] = useState('');
  const [phoneNumberValidationError, setPhoneNumberValidationError] =
    useState('');
  const [userNameValidationError, setUserNameValidationError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const [
    confirmedPasswordValidationError,
    setConfirmedPasswordValidationError,
  ] = useState('');

  const validate = () => {
    let isValid = true;
    // name
    if (!name) {
      setNameValidationError("Обов'язково");
      isValid = false;
    } else if (name.length < 2) {
      setNameValidationError('Занадто коротко');
      isValid = false;
    }
    // surname
    if (!surname) {
      setSurnameValidationError("Обов'язково");
      isValid = false;
    } else if (surname.length < 2) {
      setSurnameValidationError('Занадто коротко');
      isValid = false;
    }
    // email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailValidationError("Обов'язково");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailValidationError('Не дійсна пошта');
      isValid = false;
    }
    // phoneNumber
    if (!phoneNumber) {
      setPhoneNumberValidationError("Обов'язково");
      isValid = false;
    } else if (phoneNumber.includes('_')) {
      setPhoneNumberValidationError('Не дійсний номер');
      isValid = false;
    }
    // userName
    if (!userName) {
      setUserNameValidationError("Обов'язково");
      isValid = false;
    } else if (name.length < 2) {
      setUserNameValidationError('Занадто коротко');
      isValid = false;
    }
    // password
    if (!password) {
      setPasswordValidationError("Обов'язково");
      isValid = false;
    } else if (password.length < 5) {
      setPasswordValidationError('Занадто коротко');
      isValid = false;
    }
    // confirmedPassword
    if (!confirmedPassword) {
      setConfirmedPasswordValidationError("Обов'язково");
      isValid = false;
    } else if (confirmedPassword !== password) {
      setConfirmedPasswordValidationError('Паролі не збігаються');
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    setNameValidationError('');
  }, [name]);

  useEffect(() => {
    setSurnameValidationError('');
  }, [surname]);

  useEffect(() => {
    setEmailValidationError('');
  }, [email]);

  useEffect(() => {
    setPhoneNumberValidationError('');
  }, [phoneNumber]);

  useEffect(() => {
    setUserNameValidationError('');
  }, [userName]);

  useEffect(() => {
    setPasswordValidationError('');
  }, [password]);

  useEffect(() => {
    setConfirmedPasswordValidationError('');
  }, [confirmedPassword]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    const isValid = validate();

    if (isValid) {
      const fullName = `${name} ${surname}`;
      try {
        setLoading(true);
        const response = await registration(
          email,
          password,
          fullName,
          phoneNumber,
          userName
        );

        if (response.isSuccess) {
          localStorage.setItem('BetOnGoodness-remembered-email', email);
          localStorage.setItem('BetOnGoodness-remembered-password', password);
          navigate(LOGIN_ROUTE);
        }
      } catch (e) {
        const errorData = e.response.data.error;
        if (errorData && errorData === EMAIL_TAKEN_ERROR) {
          setEmailValidationError('Пошта зайнята');
        }
        if (errorData && USERNAME_TAKEN_ERROR_REGEX.test(errorData)) {
          setUserNameValidationError('Логін зайнятий');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className={styles.registrationWrapper}>
            <div className={styles.registration}>
              <h2>Реєстрація</h2>
              <hr />
              <div className={styles.inputListWrapper}>
                <LabeledInput
                  label={'Ім’я'}
                  type={'text'}
                  placeholder={'Петро'}
                  value={name}
                  setValue={setName}
                  onlyLetters={true}
                  maxLength={20}
                  error={nameValidationError}
                />
                <LabeledInput
                  label={'Прізвище'}
                  type={'text'}
                  placeholder={'Петренко'}
                  value={surname}
                  setValue={setSurname}
                  onlyLetters={true}
                  maxLength={20}
                  error={surnameValidationError}
                />
                <LabeledInput
                  label={'Email'}
                  type={'email'}
                  placeholder={'petro@gmail.com'}
                  value={email}
                  setValue={setEmail}
                  maxLength={35}
                  error={emailValidationError}
                />
                <LabeledInput
                  label={'Номер телефону'}
                  type={'tel'}
                  placeholder={'+380 680 000 000'}
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  error={phoneNumberValidationError}
                />
                <div className={styles.inputWrapperLine}>
                  <CheckBox setValue={setIsAdult} />
                  <label className={styles.text}>
                    Підтверджую, що мені є 18 років
                  </label>
                </div>
                <LabeledInput
                  label={'Логін'}
                  type={'text'}
                  placeholder={'Ananas87'}
                  value={userName}
                  setValue={setUserName}
                  onlyLatinAndNumbers={true}
                  maxLength={20}
                  error={userNameValidationError}
                />
                <LabeledInput
                  label={'Пароль'}
                  type={'password'}
                  placeholder={'********'}
                  value={password}
                  setValue={setPassword}
                  maxLength={20}
                  error={passwordValidationError}
                />
                <LabeledInput
                  label={'Повторити пароль'}
                  type={'password'}
                  placeholder={'********'}
                  value={confirmedPassword}
                  setValue={setConfirmedPassword}
                  maxLength={20}
                  error={confirmedPasswordValidationError}
                />
                <div className={styles.inputWrapperLine}>
                  <CheckBox setValue={setIsConfirm} />
                  <label className={styles.text}>
                    Я приймаю умови{' '}
                    <a className={styles.underLine}>
                      політики конфіденційності
                    </a>{' '}
                    та{' '}
                    <a className={styles.underLine}>
                      обробки персональних даних
                    </a>
                  </label>
                </div>
              </div>
              <Button
                onClick={registerUser}
                disabled={
                  !(
                    name &&
                    surname &&
                    email &&
                    phoneNumber &&
                    isAdult &&
                    userName &&
                    password &&
                    confirmedPassword &&
                    isConfirm
                  )
                }
                loading={loading}
              >
                Зареєструватись
              </Button>
              <div className={styles.row}>
                <span>Вже маєте акаунт?</span>
                <Link to={LOGIN_ROUTE}>
                  <span className={styles.underLine}>Увійти</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default index;
