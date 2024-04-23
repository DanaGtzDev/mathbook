import { MathJax } from "better-react-mathjax";
import Draggable from "react-draggable";
import { useState } from "react";
import "./style.css"

export interface MathBlockInterface {
  id: string;
  equation: string;
  x: number;
  y: number;
}

export const Mathblock: React.FC<MathBlockInterface> = (
  props: MathBlockInterface
) => {
  const [equation, setEquation] = useState(props.equation);
  const [blockwidth, setBlockwidth] = useState(200);
  const [editmode, setEditmode] = useState(true)

  function inputHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    let width = Math.abs((e.target.value.length * 200)/27);
    setBlockwidth(width);
    setEquation(e.target.value);
  }

  function handleKeywordKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>){
    if( e.key == 'Enter' ){
      setEditmode(false);
    }
  };
  

  return (
    <Draggable
    defaultPosition={{x: 1, y: 1}}
    >
      <div style={{ width:  "10px"}}>
        {editmode?
          <textarea autoFocus onChange={inputHandler} style={{ width:  blockwidth}} className="block-input" onKeyDown={handleKeywordKeyPress}></textarea>
          :
          <></>}
        <MathJax>{"$$\\color{white}{" + equation + "}$$"}</MathJax>
      </div>
    </Draggable>
  );
};
