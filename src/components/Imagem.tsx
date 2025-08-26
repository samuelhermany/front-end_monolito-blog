import styles from './Imagem.module.css'

interface ImagemProps {
  imgSrc: string
  alt: string
}

export function Imagem({ imgSrc, alt }: ImagemProps) {
  return <img className={styles.imagem} src={imgSrc} alt={alt} />
}
