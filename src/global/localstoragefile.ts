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

   

}