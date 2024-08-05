import { MathJaxContext } from "better-react-mathjax";
import { config } from "./global/config";
import {Mathblock} from "./components/Mathblock";
import { MathBlockInterface } from "./global/mathBlockInterface";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import { addBlock, download } from "./global/hotkeys";
import { Store } from "./global/localstoragefile";



export default function App() {
  const arr = Store.splitLocalStorage()
  const [mathBlocks, setMathBlocks] = useState<MathBlockInterface[]>(Store.LocalStorage_To_MathblockInterfaceArray(arr));

  useHotkeys("alt+n", () => {setMathBlocks([...mathBlocks, addBlock()])});
  useHotkeys("alt+s", () => {download()})

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




