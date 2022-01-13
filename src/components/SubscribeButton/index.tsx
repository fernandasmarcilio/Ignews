import styles from './subscribe-button.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button
      type="button"
      className={styles.container}
    >
      Subscribe now
    </button>
  )
}