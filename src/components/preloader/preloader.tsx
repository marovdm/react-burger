import styles from './preloader.module.scss';

export default function Preloader() {
  return (
    <div className={styles.preloader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}
