import { type ReactNode, useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./TaskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./TaskActions";

type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data
    if(countDownSeconds <= 0) {
      console.log("worker Completou");
      dispatch({type: TaskActionTypes.COMPLETE_TASK})
      worker.terminate()
    } else {
      dispatch({type: TaskActionTypes.COUNTDOWN, payload: countDownSeconds})
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      console.log("worker terminado");
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state, worker]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
