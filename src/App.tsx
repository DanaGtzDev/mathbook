import { MathJaxContext } from "better-react-mathjax";
import { config } from "./global/config";
import {Mathblock} from "./components/Mathblock";
import { MathBlockInterface } from "./global/mathBlockInterface";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import { addBlock } from "./global/hotkeys";



export default function App() {
  const [mathBlocks, setMathBlocks] = useState<MathBlockInterface[]>([]);

  useHotkeys("alt+n", () => {setMathBlocks([...mathBlocks, addBlock()])});

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




