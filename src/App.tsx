import { MathJaxContext } from "better-react-mathjax";
import { config } from "./global/config";
import {Mathblock} from "./components/Mathblock";
import { MathBlockInterface } from "./global/mathBlockInterface";
import { useHotkeys } from "react-hotkeys-hook";
import { useState } from "react";
import { addBlock, ClearScreen, download } from "./global/hotkeys";
import { Store } from "./global/localstoragefile";
import { JSONFileReader } from "./components/FileReader";


export default function App() {
  const arr = Store.splitLocalStorage()
  const [mathBlocks, setMathBlocks] = useState<MathBlockInterface[]>(Store.LocalStorage_To_MathblockInterfaceArray(arr));

  const handleFileData = (data: any) => {
    let tempMathblockArray: MathBlockInterface[] = [];
    for(let i = 0; i < data.length; i++){
      tempMathblockArray.push({
        id: data[i].id,
        equation: data[i].equation,
        x: data[i].x,
        y: data[i].y
      })
    }
    setMathBlocks(tempMathblockArray);
  };

  useHotkeys("alt+n", () => {setMathBlocks([...mathBlocks, addBlock()])});
  useHotkeys("alt+s", () => {download()})
  useHotkeys("alt+c", () => {ClearScreen()})

  return (
    <MathJaxContext config={config}>
      <JSONFileReader sendJsonData={handleFileData} ></JSONFileReader>
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




