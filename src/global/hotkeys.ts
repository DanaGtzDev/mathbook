import uuid4 from "uuid4";

export function addBlock() {
    let newBlock = {
        id: uuid4(),
        equation: "",
        x: 0,
        y: 0,
    }
    return newBlock
}