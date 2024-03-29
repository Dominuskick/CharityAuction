import React from 'react';
import styles from './footer.module.css';
import { Logo } from '@/components';
import { ResponsiveWrapper } from '@/components';

const index = () => {
  return (
    <header className={styles.footer}>
      <ResponsiveWrapper>
        <div className={styles.row}>
          <div className={styles.left}>
            <Logo />
            <p>Лоти для допомоги: купуйте і підтримуйте благодійність</p>
            <div className={styles.copyright}>
              <span></span>
              <span>2024 BetOnGoodness, всі права захищені</span>
            </div>
          </div>
          <div className={styles.contacts}>
            <h4>Контакти</h4>
            <div className={styles.contactsPoints}>
              <div className={styles.line}>
                <span>Телефони:</span>
                <div className={styles.phones}>
                  <a href="tel:0 (800) 000 00 00 00">
                    <span>0 (800) 000 00 00 00</span>
                  </a>
                  <a href="tel:+380 68 000 00 00">
                    <span>+380 68 000 00 00</span>
                  </a>
                </div>
              </div>
              <div className={styles.line}>
                <span>E-mail:</span>
                <a href="mailto:betongoodness@gmail.com">
                  <span>betongoodness@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveWrapper>
    </header>
  );
};

export default index;
