import { MathJax3Config } from "better-react-mathjax";

export const config: MathJax3Config = {
    loader: {load: ['[tex]/color']},
    tex: {packages: {'[+]': ['color']}}
};