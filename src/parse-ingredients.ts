import Quantity from './types/quantity';
import Ingredient from './types/ingredient';
import UnitType from './types/unit-type';

function parseQuantity(quantityStrRaw): Quantity {
  const quantityStr = quantityStrRaw.replace('½', '0.5');

  if (quantityStr.match(/^(?:\d|\.)+$/)) {
    return {
      number: +quantityStr,
      unitType: UnitType.Quantifiable
    };
  } else if (/^(?:\d|\.)+[a-z]+$/.test(quantityStr)) {
    const matches = quantityStr.match(/^((?:\d|\.)+)([a-z]+)$/);
    return {
      unit: matches[2],
      number: +matches[1],
      unitType: UnitType.Quantifiable
    };
  } else if (/^[a-zA-Z ]+$/.test(quantityStr)) {
    return {
      unit: quantityStr,
      number: 1,
      unitType: UnitType.Arbitrary
    };
  } else {
    throw new Error('Wth is this quantity? ' + quantityStr);
  }
}

export default function(ingredients: string[], typesMap): Ingredient[] {
  return ingredients.map(ingredientStr => {
    let nameAndQuantity: string;
    let mealMultiplier: number;
    if (ingredientStr.match(/ x [\d|.]+$/)) {
      const parts = ingredientStr.split(' ');
      mealMultiplier = Number(parts[parts.length - 1]);
      nameAndQuantity = parts.slice(0, -2).join(' ');
    } else {
      mealMultiplier = 1;
      nameAndQuantity = ingredientStr;
    }

    const name = nameAndQuantity
      .split(' ')
      .slice(1)
      .join(' ');
    const quantity = parseQuantity(ingredientStr.split(' ')[0].toLowerCase());

    // apply the meal multiplier
    quantity.number = quantity.number *= mealMultiplier;

    return {
      name,
      quantity,
      type: typesMap[name.split('(')[0].trim()]
    };
  });
}
