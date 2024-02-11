import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '@/slices/authSlice';
import authService from '@/utils/api/authService';

const index = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [btnClick, setBtnClick] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loginUser = async () => {
      const data = {
        email: email,
        password: password,
      };

      console.log(data);

      try {
        const response = await authService.login(data);
        console.log('LogIn successful:', response.data);

        if (response) {
          dispatch(setLogin(response.data.userName));
        }
      } catch (error) {
        console.error('LogIn failed:', error);
      }
    };

    if (email && password) {
      loginUser();
    }
  }, [btnClick]);

  useEffect(() => {
    if (login && email && password) {
      navigate('/account');
    }
  }, [login]);

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
                <div className={styles.inputWrapper}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Пароль</label>
                  <input
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapperLine}>
                  <CheckBox />
                  <label className={styles.text}>Запам’ятати мене</label>
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <Button onClick={() => setBtnClick(!btnClick)}>
                  Увійти до кабінету
                </Button>
              </div>
              <div className={styles.row}>
                <span>Ще не зареєстровані?</span>
                <Link to={'/registration'}>
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
