import { MathJaxContext, MathJax3Config } from "better-react-mathjax";
import {Mathblock} from "./components/Mathblock";
import { MathBlockInterface } from "./components/Mathblock";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import uuid4 from "uuid4";



export default function App() {
  const [mathBlocks, setMathBlocks] = useState<MathBlockInterface[]>([]);
  const config: MathJax3Config = {
    loader: {load: ['[tex]/color']},
    tex: {packages: {'[+]': ['color']}}
  };

  function onKeyDown() {
    console.log("Alt + N")
    setMathBlocks([
      ...mathBlocks,
      {
        id: uuid4(),
        equation: "",
        x: 0,
        y: 0,
      },
    ]);
  }

  useHotkeys("alt+n", onKeyDown);

  return (
    
    <MathJaxContext config={config}>
      {
        mathBlocks.map((block) => (
          <Mathblock
            key={block.id}
            id={block.id}
            equation={block.equation}
            x={block.x}
            y={block.y}
          />
        ))
      }
    </MathJaxContext>
   
  );
}




