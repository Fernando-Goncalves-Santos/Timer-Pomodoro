import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton/Index";
import { Input } from "../Input/Index";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextType } from "../../utils/getNextType";
import { TaskActionTypes } from "../../contexts/TaskContext/TaskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/ToastfyAdapter";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || ''

  const nextCycle = getNextCycle(state.currentCycle);
  const nextType = getNextType(nextCycle);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showMessage.dismiss()
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warning('Digite um nome para a tarefa')
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextType],
      type: nextType,
    };
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success('Tarefa iniciada')

  };

  const handleInterrupt = () => {
    showMessage.dismiss()
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    showMessage.info('Tarefa interrompida')
  };

  return (
    <form className="form" action="" onSubmit={handleSubmit}>
      <div className="formRow">
        <Input
          type={"text"}
          id={"input"}
          label={"O que você vai fazer?"}
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
          // value={taskName} // Essa é a forma controlada, é boa pra fazer validação em tempo real (por ex. e-mail)
          // onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="formRow">
        <Tips/>
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            type="submit"
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            icon={<PlayCircleIcon />}
            key={"Submit_Btn"}
          />
        ) : (
          <DefaultButton
            type="button"
            aria-label="Interromper tarefa"
            title="Interromper tarefa"
            icon={<StopCircleIcon />}
            color="red"
            onClick={handleInterrupt}
            key={"Interrupt_Btn"}
          />
        )}
      </div>
    </form>
  );
}
