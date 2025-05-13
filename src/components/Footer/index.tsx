import styles from './styles.module.css'
import { RouterLink } from '../RouterLink'
 

export const Footer = () => { // Um jeito melhor de desestruturar

  // const {children} = props  - Um jeito de desestruturar
  
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>Entenda como funciona a técnica Pomodoro</RouterLink>
      <RouterLink href='#'>Chronos Pomodoro &copy; {new Date().getFullYear()} - Fernando Gonçalves</RouterLink>
    </footer>
  )
}

