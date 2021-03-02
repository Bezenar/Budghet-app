export class Transfer {
  id: number;
  type: string;
  category: string[];
  value: number | string;
  description: string;

  constructor(
    id: number,
    type: string,
    category: Array<string>,
    value: number | string,
    description: string
  ) {
    this.id = id;
    this.type = type;
    this.category = this.setCategory(category);
    this.value =
      this.type === "INCOME"
        ? Number(value)
        : Number(value) < 0
        ? Number(value)
        : -1 * Number(value);
    this.description = description;
  }
  setCategory(array: Array<string>): Array<string> {
    const data = array.reduce((acc: Array<string>, string: string) => {
      acc.push(string.toLowerCase());
      return acc;
    }, []);
    return data;
  }
}
