import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextType } from "../../utils/getNextType";
import styles from "./styles.module.css";

  export const cycleDescriptionMap = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
  }

export const Cycles = () => {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });


  return (
    <div className={styles.cycle}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextType = getNextType(nextCycle);
          return (
            <span key={index}
              aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextType]}`}
              className={`${styles.cycleDot} ${styles[nextType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
