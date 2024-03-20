import type { Operator } from "./Operator";

export class StepProcess {
    variable1: string;
    variable2: string = "";
    operator: Operator;
    isSingleVariable: boolean;
    index: number = 0;
    static currentIndex: number = 0;
    static labelIndex: number = 0;

    constructor(
        variable1: string,
        variable2: string,
        operator: Operator,
        isSingleVariable: boolean = false
    ) {
        this.variable1 = variable1;
        this.variable2 = variable2;
        this.operator = operator;
        this.isSingleVariable = isSingleVariable;
        this.index = ++StepProcess.labelIndex;
        StepProcess.currentIndex++;
    }

    toString(): string {
        if (this.isSingleVariable) {
            return `${this.operator.value}${this.variable1}`;
        }
        return `${this.variable1}${this.operator.value}${this.variable2}`;
    }

    static backStep(): void {
        StepProcess.labelIndex--;
    }
}
