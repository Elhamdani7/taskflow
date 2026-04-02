import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import { setAuthToken } from '../api/axios';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setAuthToken(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button>
        <h1 className={styles.logo}>{title}</h1>
      </div>
      <div className={styles.right}>
        {user && <span className={styles.userName}>{user.name}</span>}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}