/**
 * 
 * Regex
 * 
 * \$\$(?<EQUATION>.*)\$\$\(x:(?<X>[0-9]*),y:(?<Y>[0-9]*)\)
 * 
 * Format
 * 
 * $$\frac{12x}{x}$$(x:150,y:244)
 * 
 * 
 */

import { MathBlockInterface } from "./mathBlockInterface";

export class Store{
     /**
     * 
     * REMOVE THIS ON PROD PLEASEEEEEE
     * 
     */
     public static removeAllItems(){
        localStorage.clear();
    }

    public static storeItem(m: MathBlockInterface){
        const format = "$$" + m.equation + "$$(x:" + m.x + ",y:" + m.y + ")"
        localStorage.setItem(m.id, format);
    }

    public static getItem(id: string){
        return localStorage.getItem(id);
    }

    public static removeItem(id: string){
        localStorage.removeItem(id);
    }

    public static splitLocalStorage(): string[] {
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
    
    public static LocalStorage_To_MathblockInterfaceArray(arr: string[]) : MathBlockInterface[]{
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
                    temp.equation = match.groups?.EQUATION.replace("\\\\", "\\")
                    temp.x = parseFloat(match.groups?.X)
                    temp.y = parseFloat(match.groups?.Y)
                }
    
                res.push(temp)
            });
        }
        return res
    }
    
    public static MathblockInterface_To_JSON(m: MathBlockInterface): Object{
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

   

}