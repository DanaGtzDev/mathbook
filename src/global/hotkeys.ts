import uuid4 from "uuid4";
import { MathBlockInterface } from "./mathBlockInterface";
import { Store } from "./localstoragefile";
import { downloadFile } from "./utilities";

export function addBlock() {
    let newBlock = {
        id: uuid4(),
        equation: "",
        x: 0,
        y: 0,
    }
    return newBlock
}


export function download(){
    const jsonRes : Object[] = []
    const arr = Store.splitLocalStorage()
    const mathblockArray: MathBlockInterface[] = Store.LocalStorage_To_MathblockInterfaceArray(arr)

    for(let i = 0; i < mathblockArray.length; i++){
        jsonRes.push(Store.MathblockInterface_To_JSON(mathblockArray[i]))
    }

    downloadFile(jsonRes)
}

export function ClearScreen(){
    localStorage.clear();
    location.reload();
}



