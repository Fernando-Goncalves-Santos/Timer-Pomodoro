import type { ComponentProps } from "react";
import styles from './styles.module.css'

type InputProps = {
  id: string; // Essa linha OBRIGA o input a vir com um ID
  label?: string;
} & ComponentProps<"input">; // Essa linha diz que InputProps PODE TER todos os atributos de input

export const Input = ({ type, id, label, ...rest }: InputProps) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input className={styles.input} id={id} type={type} {...rest} /> {/* Esse rest que esta sendo spreadado aqui garante que qualquer outro atibuto passado como props seja incluido aqui */}
    </>
  );
};
