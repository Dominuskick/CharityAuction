import styles from './error.module.css';
import { Button, PageStructure } from '@/components';
import errorImg from '../../assets/img/error.png';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '@/utils/constants/routes';

const Error = () => {
  return (
    <PageStructure>
      <div className={styles.errorWrapper}>
        <h2 className={styles.header}>ВИНИКЛА ПОМИЛКА</h2>
        <img className={styles.img} src={errorImg} alt="Помилка 404" />
        <p className={styles.message}>
          Сторінка, яку ви намагалися знайти, була видалена, перенесена або
          посилання було введене неправильно. Перейдіть на головну сторінку і
          спройбуте знайти інформацію там
        </p>
        <Link to={HOME_ROUTE}>
          <Button isBlack={true}>Повернутись на головну</Button>
        </Link>
      </div>
    </PageStructure>
  );
};

export default Error;
