export class TableRow {
  combination: string;
  result: string;
  index: number;

  constructor(index: number, combination: string, result: string) {
    this.index = index;
    this.combination = combination;
    this.result = result;
  }

  toString(): string {
    return `${this.index} ${this.combination} ${this.result}`;
  }
}
