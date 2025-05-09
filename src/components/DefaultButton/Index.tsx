import type { ComponentProps, ReactNode } from "react";
import styles from './styles.module.css'

type ButtonProps = {
  icon: ReactNode,
  color?: "green" | "red",
} & ComponentProps<"button">; 

export const DefaultButton = ({icon, color = "green",  ...props }: ButtonProps) => {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>{icon}</button>
    </>
  );
};
