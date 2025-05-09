import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextType } from "../../utils/getNextType";

export const Tips = () => {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextType = getNextType(nextCycle);

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        O próximo ciclo é de <b>{state.config.workTime}min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        O próximo ciclo é de <b>{state.config.shortBreakTime}min</b>
      </span>
    ),
    longBreakTime: (
      <span>
        O próximo ciclo é de <b>{state.config.longBreakTime}min</b>
      </span>
    ),
  };

  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        <b>Foque</b> por {state.config.workTime}min
      </span>
    ),
    shortBreakTime: (
      <span>
        <b>Descanse</b> por {state.config.shortBreakTime}min
      </span>
    ),
    longBreakTime: (
      <span>
        <b>Descanse</b> por {state.config.longBreakTime}min
      </span>
    ),
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextType]}
    </>
  );
};
