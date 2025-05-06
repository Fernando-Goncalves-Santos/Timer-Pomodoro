import "./styles/theme.css";
import "./styles/global.css";
import { Container } from "./components/Container";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { Countdown } from "./components/Countdown";
import { Input } from "./components/Input/Index";
import { Cycles } from "./components/Cycles";

function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
      <Container>
        <Countdown />
      </Container>
      <Container>
        <form className="form" action="">
          <div className="formRow">
            <Input type={"text"} id={"input"} label={"task"}/>
          </div>
          <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="formRow">
            <Cycles/>
          </div>
          <div className="formRow">
            <button>Enviar</button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default App;
