import { Operator, Operators } from "./Operator";
import { StepProcess } from "./StepProcess";
import { TableRow } from "./TableRow";

export class TruthTable {
    postfix: string = "";
    infix: string = "";
    variables: string[] = [];
    columns: any = {};
    alphabet: string[] =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    operators: string[] = [];
    errorMessage: string = "";
    language: string = "en";
    counter1s: number = 0;
    counters0s: number = 0;
    table: TableRow[] = [];
    steps: StepProcess[] = [];
    index0InVariables: number = -1;
    index1InVariables: number = -1;
    totalRows: number = 0;
    tipo: string = "";
    evaluationId: number = 0;
    static contradictionId: number = 0;
    static tautologyId: number = 1;
    static contingencyId: number = 2;
    operatorsHistory: string[] = [];

    notOpers: string[] = [
        Operators.NOT.value,
        Operators.NOT2.value,
        Operators.NOT3.value,
    ];
    andOpers: string[] = [Operators.AND.value, Operators.AND2.value];
    xorOpers: string[] = [Operators.XOR.value, Operators.XOR2.value];
    orOpers: string[] = [Operators.OR.value, Operators.OR2.value];

    statesSteps: number[] = [];
    finalTable: any = [];

    priorities: { [key: string]: number } = {
        "~": 16,
        "!": 15,
        "¬": 15,
        "⊼": 14,
        "⊻": 13,
        "⊕": 12,
        "↓": 11,
        "&": 10,
        "∧": 10,
        "|": 9,
        "∨": 9,
        "⇍": 8,
        "￩": 7,
        "⇏": 6,
        "⇎": 5,
        "┲": 4,
        "┹": 3,
        "⇒": 2,
        "⇔": 1,
        "(": 0,
    };

    constructor(language: "en" | "es", infix: string) {
        this.language = language;
        this.infix = infix;
        this.setOperators();
    }

    setOperators(): void {
        this.operators = [];
        this.operators.push(Operators.ABC.value);
        this.operators.push(Operators.AND.value);
        this.operators.push(Operators.AND2.value);
        this.operators.push(Operators.ANTICODICIONAL.value);
        this.operators.push(Operators.BICODICIONAL.value);
        this.operators.push(Operators.CODICIONAL.value);
        this.operators.push(Operators.CONTRADICTION.value);
        this.operators.push(Operators.EQUAL.value);
        this.operators.push(Operators.FALSE.value);
        this.operators.push(Operators.NAND.value);
        this.operators.push(Operators.NOR.value);
        this.operators.push(Operators.NOT.value);
        this.operators.push(Operators.NOT2.value);
        this.operators.push(Operators.NOT3.value);
        this.operators.push(Operators.NOT_BICONDITIONAL.value);
        this.operators.push(Operators.NOT_CONDITIONAL.value);
        this.operators.push(Operators.NOT_CONDITIONAL_INVERSE.value);
        this.operators.push(Operators.OR.value);
        this.operators.push(Operators.OR2.value);
        this.operators.push(Operators.TAUTOLOGY.value);
        this.operators.push(Operators.TRUE.value);
        this.operators.push(Operators.XOR.value);
        this.operators.push(Operators.XOR2.value);
    }

    init(): boolean {
        console.clear();
        const result = this.convertInfixToPostfix();
        if (result) {
            this.calculate();
        }

        let table = [];
        let headers = [...this.variables];

        console.log("this.operatorsHistory", this.operatorsHistory);

        for (const step of this.steps) {
            console.log("step", step.operator.value);

            headers.push(
                step.isSingleVariable
                    ? `${step.operator.value}${step.variable1}`
                    : `${step.variable1} ${step.operator.value} ${step.variable2}`
            );
        }

        table.push(headers);

        for (let i = 0; i < this.totalRows; i++) {
            let row = [];
            for (const variable of this.variables) {
                row.push(this.columns[variable][i]);
            }

            for (const step of this.steps) {
                row.push(this.columns[step.toString()][i]);
            }

            table.push(row);
        }
        this.finalTable = table;

        return result;
    }

    convertInfixToPostfix(): boolean {
        this.postfix = this.infixToPostfix(this.infix);
        if (this.postfix.length === 0) {
            return false;
        }

        return true;
    }

    createColumnsForVariables(): void {
        for (let i = 0; i < this.variables.length; i++) {
            this.columns[this.variables[i]] = [];
        }
    }

    checkOperatorHistory(opStack: string[]) {
        if (opStack.length > this.operatorsHistory.length) {
            this.operatorsHistory = [...opStack];
        }
    }

    infixToPostfix(infix: string): string {
        const opStack: string[] = [];
        const postfixList: string[] = [];

        for (const token of infix.split("")) {
            if (this.alphabet.includes(token)) {
                postfixList.push(token);
                if (!this.variables.includes(token)) {
                    this.variables.push(token);
                }
            } else if (token === "(") {
                opStack.push(token);
            } else if (token === ")") {
                console.log("opstack", opStack);
                if (opStack.length === 0) {
                    this.errorMessage =
                        this.language === "en"
                            ? "Uncompleted parenthesis"
                            : "Paréntesis incompletos";
                    return "";
                }
                let topToken = opStack.pop();

                while (topToken !== "(") {
                    postfixList.push(topToken!);

                    if (opStack.length === 0) {
                        this.errorMessage =
                            this.language === "en"
                                ? "Uncompleted parenthesis"
                                : "Paréntesis incompletos";
                        return "";
                    }

                    topToken = opStack.pop();
                }
            } else {
                while (
                    opStack.length > 0 &&
                    this.priorities[opStack[opStack.length - 1]]! >
                        this.priorities[token]
                ) {
                    postfixList.push(opStack.pop()!);
                }

                opStack.push(token);
            }
        }

        while (opStack.length > 0) {
            const last = opStack.pop();
            if (last === "(") {
                this.errorMessage =
                    this.language === "en"
                        ? "Uncompleted parenthesis"
                        : "Paréntesis incompletos";
                return "";
            }
            postfixList.push(last!);
        }
        return postfixList.join("");
    }

    required2Operators(operator: string): boolean {
        if (this.notOpers.includes(operator)) return false;
        return true;
    }

    checkIfIsCorrectlyFormed(): boolean {
        const pila: string[] = [];

        for (const c of this.postfix.split("")) {
            if (this.isOperator(c)) {
                if (pila.length === 0) {
                    if (this.required2Operators(c)) {
                        this.errorMessage = `${c}: ${
                            this.language === "en"
                                ? "requires two operators"
                                : "requiere 2 operandos"
                        }`;
                    } else {
                        this.errorMessage = `${c}: ${
                            this.language === "en"
                                ? "requires one operator"
                                : "requiere 1 operando"
                        }}`;
                    }
                    return false;
                }
                pila.pop();
                let resultado = "";
                if (this.required2Operators(c)) {
                    if (pila.length === 0) {
                        this.errorMessage = `${c}: ${
                            this.language === "en"
                                ? "requires two operators"
                                : "requiere 2 operandos"
                        }`;
                        return false;
                    }
                    pila.pop();
                    resultado = "0";
                } else if (this.notOpers.includes(c)) {
                    resultado = "9";
                }
                pila.push(resultado);
            } else {
                pila.push(c);
            }
        }
        if (pila.length === 1) {
            return true;
        } else {
            this.errorMessage =
                this.language === "en"
                    ? "Invalid expression"
                    : "Expresión inválida";
            return false;
        }
    }

    isOperator(c: string): boolean {
        return this.operators.includes(c);
    }

    calculate(): void {
        this.table = [];
        this.counter1s = 0;
        this.counters0s = 0;
        this.variables.sort();
        this.createColumnsForVariables();

        StepProcess.currentIndex = this.variables.length - 1;
        StepProcess.labelIndex = 0;
        // Get steps
        this.getSteps(this.postfix);

        if (this.variables.includes("0")) {
            this.index0InVariables = this.variables.indexOf("0");
        }

        if (this.variables.includes("1")) {
            this.index1InVariables = this.variables.indexOf("1");
        }

        const totalCombinations: number = Math.pow(2, this.variables.length);

        const sizeOfCombinations: number = (totalCombinations - 1).toString(
            2
        ).length;
        this.totalRows = totalCombinations;
        for (let i = totalCombinations - 1; i >= 0; i--) {
            let combination = i.toString(2);
            combination = this.formatCombination(
                combination,
                sizeOfCombinations
            );
            const combinationInPostfix = this.varSubstitutions(
                this.postfix,
                combination
            );
            const result = this.evaluation(combinationInPostfix);
            this.table.push(new TableRow(i, combination, result.toString()));

            if (result === 1) {
                this.counter1s++;
            } else {
                this.counters0s++;
            }
        }
        if (this.counter1s === totalCombinations) {
            this.tipo = this.language === "en" ? "Tautology" : "Tautología";
            this.evaluationId = TruthTable.tautologyId;
        } else if (this.counters0s === totalCombinations) {
            this.tipo =
                this.language === "en" ? "Contradiction" : "Contradicción";
            this.evaluationId = TruthTable.contradictionId;
        } else {
            this.tipo = this.language === "en" ? "Contingency" : "Contingencia";
            this.evaluationId = TruthTable.contingencyId;
        }
    }

    formatCombination(combination: string, length: number): string {
        while (combination.length < length) {
            combination = "0" + combination;
        }

        if (this.index0InVariables !== -1) {
            combination =
                combination.substring(0, this.index0InVariables) +
                "0" +
                combination.substring(this.index0InVariables + 1);
        }

        if (this.index1InVariables !== -1) {
            combination =
                combination.substring(0, this.index1InVariables) +
                "1" +
                combination.substring(this.index1InVariables + 1);
        }

        return combination;
    }

    varSubstitutions(postfix: string, combination: string): string {
        for (let i = 0; i < this.variables.length; i++) {
            const val = combination.charAt(i);
            const variable = this.variables[i];

            if (this.columns[variable]) {
                this.columns[variable].push(val);
            }

            postfix = postfix.replace(new RegExp(variable, "g"), val);
        }
        return postfix;
    }

    getSteps(postfija: string): void {
        const stack: string[] = [];
        this.steps = [];
        for (const c of postfija.split("")) {
            let currentOper = Operators.AND;
            if (this.alphabet.includes(c)) {
                stack.push(c);
            } else {
                let a: string, b: string;
                a = stack.pop()!;
                let s: StepProcess;
                if (this.notOpers.includes(c)) {
                    currentOper = this.getCurrentOperFromString(c)!;
                    s = new StepProcess(a, "", currentOper, true);
                } else {
                    b = stack.pop()!;
                    if (this.orOpers.includes(c)) {
                        currentOper = this.getCurrentOperFromString(c)!;
                    } else if (this.andOpers.includes(c)) {
                        currentOper = this.getCurrentOperFromString(c)!;
                    } else if (c === Operators.CODICIONAL.value) {
                        currentOper = Operators.CODICIONAL;
                    } else if (c === Operators.BICODICIONAL.value) {
                        currentOper = Operators.BICODICIONAL;
                    } else if (c === Operators.NOR.value) {
                        currentOper = Operators.NOR;
                    } else if (c === Operators.NAND.value) {
                        currentOper = Operators.NAND;
                    } else if (this.xorOpers.includes(c)) {
                        currentOper = this.getCurrentOperFromString(c)!;
                    } else if (c === Operators.ANTICODICIONAL.value) {
                        currentOper = Operators.ANTICODICIONAL;
                    } else if (c === Operators.NOT_CONDITIONAL.value) {
                        currentOper = Operators.NOT_CONDITIONAL;
                    } else if (c === Operators.NOT_CONDITIONAL_INVERSE.value) {
                        currentOper = Operators.NOT_CONDITIONAL_INVERSE;
                    } else if (c === Operators.NOT_BICONDITIONAL.value) {
                        currentOper = Operators.NOT_BICONDITIONAL;
                    } else if (c === Operators.TAUTOLOGY.value) {
                        currentOper = Operators.TAUTOLOGY;
                    } else if (c === Operators.CONTRADICTION.value) {
                        currentOper = Operators.CONTRADICTION;
                    }

                    s = new StepProcess(b, a, currentOper);
                }
                this.addStep(s);
                stack.push(s.toString());
            }
        }
    }

    evaluation(combination: string): number {
        const stack: string[] = [];
        const stepsKeys: string[] = Object.keys(this.columns).slice(
            this.variables.length
        );

        let counterSteps = 0;
        for (const c of combination.split("")) {
            if ("01".includes(c)) {
                stack.push(c);
            } else {
                let resultado = 0;
                const a = parseInt(stack.pop()!);
                let b: number;
                if (this.notOpers.includes(c)) {
                    resultado = this.not(a);
                } else {
                    b = parseInt(stack.pop()!);
                    if (this.orOpers.includes(c)) {
                        resultado = this.or(b, a);
                    } else if (this.andOpers.includes(c)) {
                        resultado = this.and(b, a);
                    } else if (c === Operators.CODICIONAL.value) {
                        resultado = this.condicional(b, a);
                    } else if (c === Operators.BICODICIONAL.value) {
                        resultado = this.bicondicional(b, a);
                    } else if (c === Operators.NOR.value) {
                        resultado = this.nor(b, a);
                    } else if (c === Operators.NAND.value) {
                        resultado = this.nand(b, a);
                    } else if (this.xorOpers.includes(c)) {
                        resultado = this.xor(b, a);
                    } else if (c === Operators.ANTICODICIONAL.value) {
                        resultado = this.replicador(b, a);
                    } else if (c === Operators.NOT_CONDITIONAL.value) {
                        resultado = this.not(this.condicional(b, a));
                    } else if (c === Operators.NOT_CONDITIONAL_INVERSE.value) {
                        resultado = this.not(this.replicador(b, a));
                    } else if (c === Operators.NOT_BICONDITIONAL.value) {
                        resultado = this.not(this.bicondicional(b, a));
                    } else if (c === Operators.TAUTOLOGY.value) {
                        resultado = 1;
                    } else if (c === Operators.CONTRADICTION.value) {
                        resultado = 0;
                    }
                }
                stack.push(resultado.toString());
                if (
                    this.columns[stepsKeys[this.statesSteps[counterSteps] - 1]]
                ) {
                    this.columns[
                        stepsKeys[this.statesSteps[counterSteps] - 1]
                    ].push(resultado.toString());
                    counterSteps++;
                }
            }
        }

        return parseInt(stack[stack.length - 1]);
    }

    replicador(a: number, b: number): number {
        if (a === 0 && b === 1) return 0;
        return 1;
    }

    tautologia(a: number, b: number): number {
        return 1;
    }

    contradiccion(a: number, b: number): number {
        return 0;
    }

    or(a: number, b: number): number {
        if (a === 1 || b === 1) return 1;
        return 0;
    }

    and(a: number, b: number): number {
        if (a === 1 && b === 1) return 1;
        return 0;
    }

    not(a: number): number {
        if (a === 1) return 0;
        return 1;
    }

    xor(a: number, b: number): number {
        if (a === b) return 0;
        return 1;
    }

    nand(a: number, b: number): number {
        return this.not(this.and(a, b));
    }

    xnor(a: number, b: number): number {
        return this.not(this.xor(a, b));
    }

    nor(a: number, b: number): number {
        return this.not(this.or(a, b));
    }

    condicional(a: number, b: number): number {
        if (a === 1 && b === 0) return 0;
        return 1;
    }

    bicondicional(a: number, b: number): number {
        if (a === b) return 1;
        return 0;
    }

    getCurrentOperFromString(oper: string): Operator | null {
        if (oper === Operators.OR.value) return Operators.OR;
        if (oper === Operators.OR2.value) return Operators.OR2;

        if (oper === Operators.AND.value) return Operators.AND;
        if (oper === Operators.AND2.value) return Operators.AND2;

        if (oper === Operators.NOT.value) return Operators.NOT;
        if (oper === Operators.NOT2.value) return Operators.NOT2;
        if (oper === Operators.NOT3.value) return Operators.NOT3;

        if (oper === Operators.XOR.value) return Operators.XOR;
        if (oper === Operators.XOR2.value) return Operators.XOR2;

        return null;
    }

    private checkCanAddStep(step: StepProcess): number {
        for (const s of this.steps) {
            if (s.toString() === step.toString()) return s.index;
        }
        return -1;
    }

    private addStep(step: StepProcess): void {
        const index: number = this.checkCanAddStep(step);
        if (index === -1) {
            this.columns[step.toString()] = [];
            this.steps.push(step);
            this.statesSteps.push(step.index);
        } else {
            this.statesSteps.push(index);
            StepProcess.backStep();
        }
    }

    checkIsOk(): boolean {
        return (
            this.infixToPostfix(this.infix).length > 0 &&
            this.checkIfIsCorrectlyFormed()
        );
    }
}
