import { MathJax } from "better-react-mathjax";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import "./style.css"
import { MathBlockInterface } from "../global/mathBlockInterface";
import { Store } from "../global/localstoragefile";

export const Mathblock: React.FC<MathBlockInterface> = (
  props: MathBlockInterface
) => {
  
  const [equation, setEquation] = useState(props.equation.replace(/\\+/g, '\\'));
  const [blockwidth, setBlockwidth] = useState(200);
  const [editmode, setEditmode] = useState(() => {
    if(Store.getItem(props.id) || props.x !== 0 || props.y !== 0){
      return false
    }else{
      return true
    }
  })
  const blId = "block-container-" + props.id

  function inputHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    let width = Math.abs((e.target.value.length * 200)/27);
    setBlockwidth(width);
    setEquation(e.target.value);
  }

  function handleKeywordKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>){
    if( e.key == 'Enter' ){
      setEditmode(false);
      const bl = document.getElementById(blId);
      if(bl){
        let rect = bl.getBoundingClientRect();
        const storageInfo: MathBlockInterface = {
          id: props.id, 
          equation: equation,
          x: rect.top,
          y: rect.left
        }
        Store.storeItem(storageInfo);
      }else{
        console.log("NO CAPTOOO")
      }
    }
  };

  function handleDoubleClick(){
    setEditmode(true)
  }

  //TODO: 
  //This doesn't really deletes the block, it only makes it invisible 
  function deleteBlock(e: any){
    const container = document.getElementById(blId)
    if(container){
      container.style.display = "none"
    }
    Store.removeItem(props.id)    
  }

  useEffect(() => {
    const block = document.getElementById(blId)
    block!.style.position = "absolute"
    block!.style.left = props.x + "px"
    block!.style.top = props.y + "px"
  },[])



  return (
    <div id={blId} onMouseUp={(e) => {Store.updateBlockPos(props.id, e.clientX, e.clientY)}}>
      <Draggable > 
      <div style={{ width:  "10px"}} >
        {editmode?
          <div>
            <div style={{display: "flex"}}>
              <button onMouseDown={deleteBlock}>Delete</button>
              <button onMouseDown={() => {setEditmode(false)}} >Confirm</button>
            </div>
            
            <textarea autoFocus onChange={inputHandler} style={{ width:  blockwidth}} className="block-input" onKeyDown={handleKeywordKeyPress}>{equation}</textarea>
            <MathJax>{"$$\\color{white}{" + equation + "}$$"}</MathJax>
          </div>
          :
          <div onMouseDown={handleDoubleClick}> 
            <MathJax>{"$$\\color{white}{" + equation + "}$$"}</MathJax>
          </div>}
        
      </div>
    </Draggable>
    </div>
    
  );
};
