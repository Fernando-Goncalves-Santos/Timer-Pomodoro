import { type ReactNode, useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./TaskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./TaskActions";
import { loadBeep } from "../../utils/loadBeep";
import { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state')

    if(!storageState) return initialTaskState;
    const parsedStorageState = JSON.parse(storageState) as TaskStateModel

    return {...parsedStorageState, 
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00'
    }
  });
  let playBeepRef = useRef<() => void | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    const countDownSeconds = e.data;
    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        // Toco o áudio
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({ type: TaskActionTypes.COUNTDOWN, payload: countDownSeconds });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
    if (!state.activeTask) {
      document.title = `Chronos Pomodoro`
      worker.terminate();
    } else {
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      // Carrega o áudio
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
