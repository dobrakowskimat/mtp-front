export enum ElementTypes {
  Type1 = 'TYPE 1 Label',
  Type2 = 'TYPE 2',
  Type3 = 'TYPE 3',
}

export type ElementWithFields = {
  name: string;
  fields: any[];
  type: ElementTypes;
};

export type ElementField = {
  name: string;
  value: string;
};

export interface ElementType1Fields {
  imp1: ElementField;
  imp2: ElementField;
}

export interface ElementType1 extends MTPElement {
  type: ElementTypes.Type1;
  fields: ElementType1Fields;
}
export interface ElementType2 extends MTPElement {
  type: ElementTypes.Type2;
  fields: {
    imp7: ElementField;
  };
}
export interface ElementType3 extends MTPElement {
  type: ElementTypes.Type3;
  fields: {
    imp3: ElementField;
  };
}

export type MTPElement = {
  type: ElementTypes;
  name: string;
  dragPosition: { x: number; y: number };
};
export type MTPElementWithProps = MTPElement & {
  [key: string]: string;
};

export const type1Fields: ElementField[] = [
  { name: 'imp1', value: 'test value for imp1' },
  { name: 'imp2', value: 'test value for imp2' },
];

export const type2Fields: ElementField[] = [
  { name: 'imp7', value: 'test value for imp7' },
];

export const type3Fields: ElementField[] = [
  { name: 'imp3', value: 'test value for imp3' },
];

export interface ConnectDialogData {
  item: MTPElement;
  items: MTPElement[];
}

export interface Connection {
  from: MTPElement;
  to: MTPElement;
}
