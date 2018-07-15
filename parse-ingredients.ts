import Quantity from './types/quantity';
import Ingredient from './types/ingredient';

function parseQuantity(quantityStrRaw): Quantity {
  const quantityStr = quantityStrRaw.replace('½', '0.5');

  if (quantityStr.match(/^(?:\d|\.)+$/)) {
    return {
      number: +quantityStr
    };
  } else if (/^(?:\d|\.)+[a-z]+$/.test(quantityStr)) {
    const matches = quantityStr.match(/^((?:\d|\.)+)([a-z]+)$/);
    return {
      unit: matches[2],
      number: +matches[1]
    };
  } else if (/^[a-zA-Z ]+$/.test(quantityStr)) {
    return {
      unit: quantityStr,
      number: 1,
      unitType: 'arbitrary'
    };
  } else {
    throw new Error('Wth is this quantity? ' + quantityStr);
  }
}

export default function(ingredients: string[]): Ingredient[] {
  return ingredients.map(ingredientStr => {
    const name = ingredientStr
      .split(' ')
      .slice(1)
      .join(' ');
    const quantity = parseQuantity(ingredientStr.split(' ')[0].toLowerCase());

    return {
      name,
      quantity
    };
  });
}
