import { SignInButton } from '../SignInButton';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav className={styles.menu}>
          <a className={styles.active} href="#">Home</a>
          <a href="#">Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}