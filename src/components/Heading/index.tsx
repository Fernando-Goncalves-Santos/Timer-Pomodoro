import type { ReactNode } from 'react'
import styles from './styles.module.css'

type HeadingProps = {
  children: ReactNode
}

const Heading = ({children}: HeadingProps) => { // Um jeito melhor de desestruturar

  // const {children} = props  - Um jeito de desestruturar
  
  return (
    <h1 className={styles.heading}>{children}</h1>
  )
}

export default Heading