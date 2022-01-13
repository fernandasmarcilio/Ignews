import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './signin-button.module.scss';

export function SignInButton() {
  const isUserLoggedIn = true;
  
  return isUserLoggedIn ? (
    <button 
      type="button"
      className={styles.container}
    >
      <FaGithub color="#04D361" />
      Fernanda Marcilio
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="#EBA417" />
      Sign in with Github
    </button>
  )
}