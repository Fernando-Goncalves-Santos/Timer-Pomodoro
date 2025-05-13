import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton/Index";
import Heading from "../../components/Heading";
import MainTemplate from "../../templates/MainTemplate";
import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { cycleDescriptionMap } from "../../components/Cycles";
import { sortTasks, SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/ToastfyAdapter";
import { TaskActionTypes } from "../../contexts/TaskContext/TaskActions";


export function History() {
  const { state, dispatch } = useTaskContext();
  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({tasks: state.tasks}),
      field: 'startDate',
      direction: 'desc'
    }
  })

  // Limpando a tela
  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro'
    return () => {
      showMessage.dismiss()
    }

  }, [])

  const hasTasks = state.tasks.length > 0

  function handleSortTasks({field}: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc'
    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTaskOptions.tasks,
        field
      }),
      direction: newDirection,
      field
    })
  }

  
  
  function handleDeleteHistory () {
    showMessage.dismiss()
    showMessage.confirm('Tem certeza?', confirmation => {
      if(!confirmation) return
      dispatch({type: TaskActionTypes.RESET_TASKS})
    })    
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>{" "}
          {hasTasks && (
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar todo o histórico"
              title="Apagar Histórico"
              onClick={handleDeleteHistory}
            />
          </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.thSort} onClick={() => handleSortTasks({field: 'name'})}>⬍ Tarefa</th>
                <th className={styles.thSort} onClick={() => handleSortTasks({field: 'duration'})}>⬍ Duração</th>
                <th className={styles.thSort} onClick={() => handleSortTasks({field: 'startDate'})}>⬍ Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {state.tasks.length > 0 &&
                sortTaskOptions.tasks.map((task) => {
                  const taskDate = new Date(task.startDate).toLocaleString(
                    "pt-br",
                    {
                      dateStyle: "short",
                      timeStyle: "short",
                    }
                  );

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{taskDate}</td>
                      <td>
                        {task.completeDate
                          ? "Completa"
                          : task.interruptDate
                          ? "Interrompida"
                          : state.activeTask?.id === task.id
                          ? "Em progresso"
                          : "Abandonada"}
                      </td>
                      <td>{cycleDescriptionMap[task.type]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        )}
        {!hasTasks && (
          <p style={{textAlign: 'center', fontWeight: 'bold'}}>Ainda não existem tarefas criadas.</p>
        )}
      </Container>
    </MainTemplate>
  );
}
