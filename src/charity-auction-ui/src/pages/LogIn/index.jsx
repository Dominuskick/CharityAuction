import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox, LabeledInput } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '@/slices/authSlice';
import { ACCOUNT_ROUTE, REGISTRATION_ROUTE } from '@/utils/constants/routes';
import { login } from '@/http/userAPI';
import authService from '@/utils/api/authService';

const index = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(
    localStorage.getItem('BetOnGoodness-remembered-email') || ''
  );
  const [password, setPassword] = useState(
    localStorage.getItem('BetOnGoodness-remembered-password') || ''
  );

  const [isRememberMe, setIsRememberMe] = useState(
    localStorage.getItem('BetOnGoodness-remembered-email') &&
      localStorage.getItem('BetOnGoodness-remembered-password')
  );

  const [emailValidationError, setEmailValidationError] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const validate = () => {
    let isValid = true;
    // email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailValidationError("Обов'язково");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailValidationError('Не дійсна пошта');
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
    return isValid;
  };

  useEffect(() => {
    setEmailValidationError('');
  }, [email]);

  useEffect(() => {
    setPasswordValidationError('');
  }, [password]);

  const navigate = useNavigate();

  const rememberMe = () => {
    if (isRememberMe) {
      localStorage.setItem('remembered-email', email);
      localStorage.setItem('remembered-password', password);
    } else {
      localStorage.setItem('remembered-email', '');
      localStorage.setItem('remembered-password', '');
    }
  };

  const loginUser = async () => {
    const isValid = validate();

    if (isValid) {
      try {
        const response = await login(email, password);

        if (response.status == 200) {
          dispatch(setLogin(response.data.data.userName));
          rememberMe();
          navigate(ACCOUNT_ROUTE);
        }
      } catch (e) {
        console.error(e.response.data.error || e);
        setEmailValidationError('Недійсні облікові дані');
        setPasswordValidationError('Недійсні облікові дані');
      }
    }
  };

  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div className={styles.mainContent}>
          <div className={styles.loginWrapper}>
            <div className={styles.login}>
              <h2>Для продовження увійдіть до особистого кабінету</h2>
              <hr />
              <div className={styles.inputListWrapper}>
                <LabeledInput
                  label={'Email'}
                  type={'email'}
                  placeholder={'example@gmail.com'}
                  value={email}
                  setValue={setEmail}
                  maxLength={35}
                  error={emailValidationError}
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
                <div className={styles.inputWrapperLine}>
                  <CheckBox setValue={setIsRememberMe} />
                  <label className={styles.text}>Запам’ятати мене</label>
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <Button onClick={loginUser} disabled={!(email && password)}>
                  Увійти до кабінету
                </Button>
              </div>
              <div className={styles.row}>
                <span>Ще не зареєстровані?</span>
                <Link to={REGISTRATION_ROUTE}>
                  <span className={styles.underLine}>Зареєструватись</span>
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
