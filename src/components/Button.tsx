import styles from './Button.module.css'

interface ButtonProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  text: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({ type, text, onClick }: ButtonProps) {
  // className={styles.button} é sempre implementada
  // typeButton ou typeInput é a condificonal
  const buttonClass =
    type === 'button'
      ? `${styles.button} ${styles.typeButton}`
      : `${styles.button} ${styles.typeInput}`

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {text}
    </button>
  )
}
