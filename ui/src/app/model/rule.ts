export class Rule {
  _id: string;
  Name: string;
  Description: string;
  Type: string;
  Source: string;
  Dest: string;
  Format: string;
  CopyMode: string;
  CustomProcessor: string;
  Params: string;
  // updateMode: string;
  IfOkRules: string[];
  IfNotOkRules: string[];
}
