import Ingredient from './types/ingredient';
import UnitType from './types/unit-type';

export default function(ingredient: Ingredient): string {
  let quantityStr: string;
  if (ingredient.quantity.unitType === UnitType.Arbitrary) {
    if (ingredient.quantity.number === 1) {
      quantityStr = ingredient.quantity.unit;
    } else {
      quantityStr = `${ingredient.quantity.number} x ${
        ingredient.quantity.unit
      }`;
    }
  } else {
    quantityStr = `${ingredient.quantity.number}${
      ingredient.quantity.unit ? ingredient.quantity.unit : ''
    }`;
  }
  return `${quantityStr} ${ingredient.name}`;
}
