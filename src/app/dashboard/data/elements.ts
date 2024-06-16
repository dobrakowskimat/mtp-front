import { ElementTypes, MTPElement } from './element';

export const initialItems: MTPElement[] = [
  {
    name: 'First Element',
    type: ElementTypes.Type1,
    dragPosition: { x: 110, y: 0 },
  },
  {
    name: 'Second Item',
    type: ElementTypes.Type3,
    dragPosition: { x: 200, y: 110 },
  },
  {
    name: 'Third Item',
    type: ElementTypes.Type2,
    dragPosition: { x: 560, y: 0 },
  },
  {
    name: 'Another type 1 Item',
    type: ElementTypes.Type1,
    dragPosition: { x: 350, y: 400 },
  },
];
