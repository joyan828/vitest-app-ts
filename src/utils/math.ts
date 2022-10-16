import { BigNumber } from "bignumber.js";

export function sum(...numbers: number[]) {
  return numbers.reduce((total, number) => total + number, 0)
}

export type MathType = "plus" | "minus" | "mul" | "div";
export function math(
    type: MathType,
    a: string,
    b: string,
  ): string {
    const _a = new BigNumber(a);
    const _b = new BigNumber(b);

    let result;
    switch (type) {
      case "plus":
        result = _a.plus(_b).toFixed();
        break;
      case "minus":
        result = _a.minus(_b).toFixed();
        break;
      case "mul":
        result = _a.multipliedBy(_b).toFixed();
        break;
      case "div":
        result = _a.dividedBy(_b).toFixed();
        break;
    }

    return result;
}

