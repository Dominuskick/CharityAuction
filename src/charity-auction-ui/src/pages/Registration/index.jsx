import React, { useState, useEffect } from 'react';
import styles from './registration.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox, LabeledInput } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import authService from '@/utils/api/authService';
import { LOGIN_ROUTE } from '@/utils/constants/routes';

const index = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isAdult, setIsAdult] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [btnClick, setBtnClick] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const registerUser = async () => {
      const data = {
        email: email,
        password: password,
        fullName: `${name} ${surname}`,
        phoneNumber: phone,
        userName: userName,
      };

      console.log(data);

      try {
        const response = await authService.register(data);
        console.log('Registration successful:', response.data);

        if (response) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };

    if (isAdult && isConfirm) {
      registerUser();
    }
  }, [btnClick]);

  useEffect(() => {
    if (isRegistered) {
      navigate('/login');
    }
  }, [isRegistered]);

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
                  setState={setName}
                />
                <LabeledInput
                  label={'Прізвище'}
                  type={'text'}
                  placeholder={'Петренко'}
                  setState={setSurname}
                />
                <LabeledInput
                  label={'Email'}
                  type={'email'}
                  placeholder={'petro@gmail.com'}
                  setState={setEmail}
                />
                <LabeledInput
                  label={'Номер телефону'}
                  type={'tel'}
                  placeholder={'+380 680 000 000'}
                  setState={setPhone}
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
                  setState={setUserName}
                />
                <LabeledInput
                  label={'Пароль'}
                  type={'password'}
                  placeholder={'********'}
                  setState={setPassword}
                />
                <LabeledInput
                  label={'Повторити пароль'}
                  type={'password'}
                  placeholder={'********'}
                  setState={setPasswordConfirm}
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
              <Button onClick={() => setBtnClick(!btnClick)}>
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
