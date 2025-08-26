import { CaretCircleLeft } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import styles from './Header.module.css'

export function Header() {
  return (
    <div className={styles.container}>
      <NavLink to="/" title="Página Home">
        <CaretCircleLeft weight="fill" />
      </NavLink>
    </div>
  )
}
