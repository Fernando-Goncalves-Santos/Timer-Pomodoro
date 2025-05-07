import type { ReactNode } from "react"
import styles from './styles.module.css'

type GenericHtmlProps = {
    children: ReactNode
}

export const GenericHtml = ({children}: GenericHtmlProps) => {
  return (
    <div className={styles.genericHtml}>
        {children}
    </div>
  )
}
