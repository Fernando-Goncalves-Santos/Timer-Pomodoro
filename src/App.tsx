import "./styles/theme.css";
import "./styles/global.css";

import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { MainRouter } from "./routes/MainRouter";

function App() {
  return (
    <TaskContextProvider>
      <MainRouter/>
    </TaskContextProvider>
  );
}

export default App;
