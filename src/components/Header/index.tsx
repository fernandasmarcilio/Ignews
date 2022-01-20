import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav className={styles.menu}>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}