import uuid4 from "uuid4";
import { MathBlockInterface } from "./mathBlockInterface";

export function addBlock() {
    let newBlock = {
        id: uuid4(),
        equation: "",
        x: 0,
        y: 0,
    }
    return newBlock
}

export function splitLocalStorage(): string[] {
    const items = { ...localStorage };
    const strItems = JSON.stringify(items)
    let res: string[] = []

    /**
     * Buescar todos los :
     * Si el : está entre dos comillas
     *      partirlo ahí
     * Si no
     *      no partirlo
     */

    let arr = strItems.split(/(":")|(",")/)


    for(let i = 0; i < arr.length; i++){


        if(arr[i] != undefined && arr[i] != "\":\"" && arr[i] != "\",\""){
            if(i == 0){
                res.push(arr[i].replace("{\"", ""))
            }

            if(i == arr.length - 1){
                res.push(arr[i].replace("\"}", ""))
            }

            if(i != (arr.length - 1) && i != 0){
                res.push(arr[i])
            }
        }
        
    }

    return res;


}

export function LocalStorage_To_MathblockInterfaceArray(arr: string[]) : MathBlockInterface[]{
    let res: MathBlockInterface[] = [];
    
    const regex = /\$\$(?<EQUATION>.*)\$\$\(x:(?<X>[0-9\.]*),y:(?<Y>[0-9\.]*)\)/g
    for(let i = 0; i < arr.length; i++){
        const matches = [...arr[i].matchAll(regex)];

        matches.forEach(match => {
            let temp: MathBlockInterface = {
                id: "",
                equation: "",
                x: 0,
                y: 0
            };
            if (match.groups?.EQUATION && match.groups?.X && match.groups?.Y){
                temp.id = arr[i - 1]
                temp.equation = match.groups?.EQUATION
                temp.x = parseFloat(match.groups?.X)
                temp.y = parseFloat(match.groups?.Y)
            }

            res.push(temp)
        });
    }
    return res
}

export function MathblockInterface_To_JSON(m: MathBlockInterface): Object{
    let res = {
        "id": "",
        "equation": "",
        "x": 0,
        "y": 0
    };

    res["id"] = m.id;
    res["equation"] = m.equation;
    res["x"] = m.x;
    res["y"] = m.y;

    return res;
}

export function download(){
    const jsonRes : Object[] = []
    const arr = splitLocalStorage()
    const mathblockArray: MathBlockInterface[] = LocalStorage_To_MathblockInterfaceArray(arr)

    for(let i = 0; i < mathblockArray.length; i++){
        jsonRes.push(MathblockInterface_To_JSON(mathblockArray[i]))
    }

    return jsonRes;
}

