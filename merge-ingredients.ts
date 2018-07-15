import Ingredient from './types/ingredient';

function getMergedIngredientsWithSameName(
  mergedIngredients: Ingredient[],
  ingredient: Ingredient
) {
  // very naive stemming
  const nameMatches = [ingredient.name];
  if (ingredient.name.slice(-1) === 's') {
    nameMatches.push(ingredient.name.slice(0, ingredient.name.length - 1));
  }
  return mergedIngredients.filter(mergedListItem =>
    nameMatches.includes(mergedListItem.name)
  );
}

export default function(unmergedIngredients: Ingredient[]): Ingredient[] {
  const mergedIngredients: Ingredient[] = [];

  unmergedIngredients.forEach((thisIngredient: Ingredient) => {
    const sameName: Ingredient[] = getMergedIngredientsWithSameName(
      mergedIngredients,
      thisIngredient
    );

    if (!sameName.length) {
      // if there's no items in there with the same name, stick it in
      mergedIngredients.push(thisIngredient);
    } else {
      // else, check out the units
      const sameNameAndUnit: Ingredient = sameName.find(
        (mergedIngreed: Ingredient) =>
          thisIngredient.quantity.unit === mergedIngreed.quantity.unit
      );

      if (sameNameAndUnit) {
        sameNameAndUnit.quantity.number += thisIngredient.quantity.number;
      } else {
        // new unit, stick it in
        mergedIngredients.push(thisIngredient);
      }
    }
  });

  return mergedIngredients;

  // return mergedList.map(item => {
  //   let quantity;
  //   if (item.unitType === 'arbitrary') {
  //     if (item.amount === 1) {
  //       quantity = item.unit;
  //     } else {
  //       quantity = `${item.amount} x ${item.unit}`;
  //     }
  //   } else {
  //     quantity = `${item.amount}${item.unit ? item.unit : ''}`;
  //   }
  //   return `${quantity} ${item.name}`;
  // });
}
