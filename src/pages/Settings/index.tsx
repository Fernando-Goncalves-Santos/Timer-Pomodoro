import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton/Index";
import Heading from "../../components/Heading";
import { Input } from "../../components/Input/Index";
import MainTemplate from "../../templates/MainTemplate";
import { useEffect, useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/ToastfyAdapter";
import { TaskActionTypes } from "../../contexts/TaskContext/TaskActions";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro'
  }, [])

  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();
    let workTime = Number(workTimeInputRef.current?.value);
    let shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    let longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if (workTime < 1 || workTime > 99) {
      showMessage.error("Foco ínvalido");
      return;
    }

    if (shortBreakTime < 1 || shortBreakTime > 99) {
      showMessage.error("Descanso curto ínvalido");
      return;
    }
    if (longBreakTime < 1 || longBreakTime > 99) {
      showMessage.error("descanso longo ínvalido");
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_CONFIG,
      payload: { workTime, 
        shortBreakTime, 
        longBreakTime },
    });

    showMessage.success('Configurações salvas com sucesso!')
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as congfigurações para tempo de foco, descanso curto e
          descanso longo
        </p>
      </Container>
      <Container>
        <form onSubmit={handleSaveSettings} action="" className="form">
          <div className="formRow">
            <Input
              id="workTime"
              label="Foco"
              ref={workTimeInputRef}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <Input
              id="shortBreakTime"
              label="Descanso curto"
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <Input
              id="longBreakTime"
              label="Descanso longo"
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultButton
              icon={<SaveIcon />}
              aria-label="Salvar configurações"
              title="Salvar"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
