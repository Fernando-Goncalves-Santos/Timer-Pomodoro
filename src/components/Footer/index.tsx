
import styles from './styles.module.css'
 

export const Footer = () => { // Um jeito melhor de desestruturar

  // const {children} = props  - Um jeito de desestruturar
  
  return (
    <footer className={styles.footer}>
      <a href='#'>Entenda como funciona a técnica Pomodoro</a>
      <a href='#'>Chronos Pomodoro &copy; {new Date().getFullYear()} - Fernando Gonçalves</a>
    </footer>
  )
}

