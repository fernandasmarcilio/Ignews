import styles from './subscribe-button.module.scss';

export function SubscribeButton() {
  return (
    <button
      type="button"
      className={styles.container}
    >
      Subscribe now
    </button>
  )
}