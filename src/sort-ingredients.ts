import Ingredient from './types/ingredient';

const typeOrder = ['veg', 'chilled', 'meat', 'pantry', 'baking', 'frozen'];

export default function(ingredients: Ingredient[]): Ingredient[] {
  return ingredients
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .sort((a, b) => {
      return (
        (typeOrder.indexOf(a.type) === -1 ? 99 : typeOrder.indexOf(a.type)) -
        (typeOrder.indexOf(b.type) === -1 ? 99 : typeOrder.indexOf(b.type))
      );
    });
}
