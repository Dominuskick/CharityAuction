import styles from './index.module.css';
import { Header, Footer } from '@/layout';

const index = ({ children, alignItemsCenter = false }) => {
  return (
    <>
      <Header />
      <main className={styles.darkMain}>
        <div
          className={`${styles.mainContent} ${
            alignItemsCenter && styles.mainContent__alignCenter
          }`}
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default index;
