import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton/Index";
import { Input } from "../Input/Index";


export function MainForm() {
    return (
        <form className="form" action="">
          <div className="formRow">
            <Input type={"text"} id={"input"} label={"task"} />
          </div>
          <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="formRow">
            <Cycles />
          </div>
          <div className="formRow">
            <DefaultButton icon={<PlayCircleIcon />} />
          </div>
        </form>
    )
}