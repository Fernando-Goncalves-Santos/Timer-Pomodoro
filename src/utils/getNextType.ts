import type { TaskModel } from "../models/TaskModel"

export function getNextType (currentCycle: number) :TaskModel['type'] {
    if (currentCycle %2 !== 0) return 'workTime'
    return currentCycle === 8 ? 'longBreakTime' : 'shortBreakTime'
}