import React, { useState, useEffect } from 'react';
import styles from './registration.module.css';
import { Header, Footer } from '@/layout';
import { Button, CheckBox } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import authService from '@/utils/api/authService';

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
                <div className={styles.inputWrapper}>
                  <label>Ім’я</label>
                  <input
                    type="text"
                    placeholder="Петро"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Прізвище</label>
                  <input
                    type="text"
                    placeholder="Петренко"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="petro@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label>Номер телефону</label>
                  <input
                    type="tel"
                    placeholder="+380 680 000 000"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapperLine}>
                  <CheckBox setValue={setIsAdult} />
                  <label className={styles.text}>
                    Підтверджую, що мені є 18 років
                  </label>
                </div>
                <div className={styles.inputWrapper}>
                  <label>Логін</label>
                  <input
                    type="text"
                    placeholder="Ananas87"
                    onChange={(e) => setUserName(e.target.value)}
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
                <div className={styles.inputWrapper}>
                  <label>Повторити пароль</label>
                  <input
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
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
                <Link to={'/login'}>
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
