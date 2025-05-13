import type { TaskModel } from "../../models/TaskModel";
import { TaskStateModel } from "../../models/TaskStateModel";


export const enum TaskActionTypes {
  START_TASK = "START_TASK",
  INTERRUPT_TASK = "INTERRUPT_TASK",
  RESET_STATE = "RESET_STATE",
  COUNTDOWN = "COUNTDOWN",
  COMPLETE_TASK = "COMPLETE_TASK",
  RESET_TASKS = "RESET_TASKS",
  CHANGE_CONFIG= "CHANGE_CONFIG"
}

export type TaskActionModel =
  | {
      type: TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionTypes.COUNTDOWN;
      payload: number;
    }
  | {
      type: TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: TaskActionTypes.RESET_STATE;
    }
  | {
      type: TaskActionTypes.COMPLETE_TASK;
    }
  | {
      type: TaskActionTypes.RESET_TASKS;
    }
  | {
      type: TaskActionTypes.CHANGE_CONFIG;
      payload: TaskStateModel['config']
    }
