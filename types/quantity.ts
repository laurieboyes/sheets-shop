import UnitType from './unit-type';
export default interface Quantity {
  number: number;
  unit?: string;
  unitType: UnitType;
}
