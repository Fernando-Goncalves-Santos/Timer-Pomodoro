import { type ReactNode, useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./TaskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./TaskActions";
import { loadBeep } from "../../utils/loadBeep";

type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  let playBeepRef = useRef<() => void | null>(null)

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data
    if(countDownSeconds <= 0) {
      if(playBeepRef.current) {
        // Toco o áudio
        playBeepRef.current()
        playBeepRef.current = null
      }
      dispatch({type: TaskActionTypes.COMPLETE_TASK})
      worker.terminate()
    } else {
      dispatch({type: TaskActionTypes.COUNTDOWN, payload: countDownSeconds})
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }
    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    if(state.activeTask && playBeepRef.current === null) {
      // Carrega o áudio
      playBeepRef.current = loadBeep()
    } else {
      playBeepRef.current = null
    }

  }, [state.activeTask])



  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
