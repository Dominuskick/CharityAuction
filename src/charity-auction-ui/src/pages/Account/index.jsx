import styles from './lotlist.module.css';
import { AccountPageStructure, Button } from '@/components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ACCOUNT_CREATE_LOT_ROUTE } from '@/utils/constants/routes';

const Account = () => {
  const name = useSelector((state) => state.auth.login);

  return (
    <AccountPageStructure>
      <h2 className={styles.name}>
        {name}, ми раді Вас бачити у Вашому профілі BetOnGoodness!
      </h2>
      <p className={styles.text}>
        Тут ви можете проглядати ваші ставки, викладати та редагувати ваші лоти.
        Ми, в свою чергу, забезпечимо вам комфортне перебування на нашій
        платформі
      </p>
      <Link to={ACCOUNT_CREATE_LOT_ROUTE}>
        <Button>Створити лот</Button>
      </Link>
    </AccountPageStructure>
  );
};

export default Account;
