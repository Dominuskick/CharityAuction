import { useSelector } from 'react-redux';
import { PageStructure, AccountMenu } from '..';
import styles from './index.module.css';

const index = ({ children }) => {
  const name = useSelector((state) => state.auth.login);

  return (
    <PageStructure alignItemsCenter>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.nameWrapper}>{name}</div>
          <AccountMenu />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </PageStructure>
  );
};

export default index;
