export class Operator {
  value: string;
  esName: string;
  enName: string;
  example: string;

  constructor(enName: string, esName: string, value: string, example: string) {
    this.enName = enName;
    this.esName = esName;
    this.value = value;
    this.example = example;
  }

  equals(o: any): boolean {
    if (o instanceof Operator) {
      return o.value === this.value;
    }
    return false;
  }
}

export class Operators {
  static readonly EQUAL = new Operator("", "", "=", "");
  static readonly NOT = new Operator("Negation", "Negación", "~", "~p");
  static readonly NOT2 = new Operator("Negation", "Negación", "¬", "¬p");
  static readonly NOT3 = new Operator("Negation", "Negación", "!", "!p");
  static readonly AND = new Operator("Conjunction", "Conjunción", "∧", "p∧q");
  static readonly AND2 = new Operator("Conjunction", "Conjunción", "&", "p&q");
  static readonly OR = new Operator("Disjunction", "Disyunción", "∨", "p∨q");
  static readonly OR2 = new Operator("Disjunction", "Disyunción", "|", "p|q");
  static readonly BICODICIONAL = new Operator(
    "Material Equivalence",
    "Bicondicional/Doble implicación",
    "⇔",
    "p⇔q"
  );
  static readonly CODICIONAL = new Operator(
    "Material Implication",
    "Condicional/Implicación",
    "⇒",
    "p⇒q"
  );
  static readonly ANTICODICIONAL = new Operator(
    "Inverse conditional/Replier",
    "Condicional inverso/Replicador",
    "￩",
    "p￩q"
  );
  static readonly TRUE = new Operator("True", "Verdadero", "1", "");
  static readonly FALSE = new Operator("False", "Falso", "0", "");
  static readonly XOR = new Operator(
    "Exclusive Disjunction",
    "XOR/Disyunción exclusiva",
    "⊕",
    "p⊕q"
  );
  static readonly XOR2 = new Operator(
    "Exclusive Disjunction",
    "XOR/Disyunción exclusiva",
    "⊻",
    "p⊻q"
  );
  static readonly NOR = new Operator("NOR", "NOR", "↓", "p↓q");
  static readonly NAND = new Operator("NAND", "NAND", "⊼", "p⊼q");
  static readonly NOT_CONDITIONAL_INVERSE = new Operator(
    "Inverse Conditional Negation",
    "Negación del condicional inverso",
    "⇍",
    "p⇍q"
  );
  static readonly NOT_CONDITIONAL = new Operator(
    "Implication Negation",
    "Negación del condicional",
    "⇏",
    "p⇏q"
  );
  static readonly NOT_BICONDITIONAL = new Operator(
    "Equivalence negation/XOR",
    "Negación del bicondicional",
    "⇎",
    "p⇎q"
  );
  static readonly CONTRADICTION = new Operator(
    "Contradiction",
    "Contradicción",
    "┹",
    "a┹b"
  );
  static readonly TAUTOLOGY = new Operator(
    "Tautology",
    "Tautología",
    "┲",
    "a┲b"
  );
  static readonly ABC = new Operator("", "", "ABC", "");
  static readonly MODE = new Operator("", "", "MODE", "");
}

export const operatorsArray = [
  Operators.ABC,
  Operators.TRUE,
  Operators.FALSE,
  Operators.NOT,
  Operators.NOT2,
  Operators.NOT3,
  Operators.AND,
  Operators.AND2,
  Operators.OR,
  Operators.OR2,
  Operators.BICODICIONAL,
  Operators.CODICIONAL,
  Operators.ANTICODICIONAL,
  Operators.XOR,
  Operators.XOR2,
  Operators.NOR,
  Operators.NAND,
  Operators.NOT_CONDITIONAL_INVERSE,
  Operators.NOT_CONDITIONAL,
  Operators.NOT_BICONDITIONAL,
  Operators.CONTRADICTION,
  Operators.TAUTOLOGY,
];
