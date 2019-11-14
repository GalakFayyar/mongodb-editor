export class Rule {
  _id: string;
  name: string;
  description: string;
  type: string;
  source: string;
  dest: string;
  format: string;
  copyMode: string;
  customProcessor: string;
  params: string;
  // updateMode: string;
  ifOkRules: string[];
  ifNotOkRules: string[];
}
