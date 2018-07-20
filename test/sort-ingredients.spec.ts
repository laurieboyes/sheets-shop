import Ingredient from '../src/types/ingredient';
import Quantity from '../src/types/quantity';
import UnitType from '../src/types/unit-type';
import sortIngredients from '../src/sort-ingredients';

// quantity isn't relevant for these tests but we still need one because we're conscientious TypeScript developers now
const quantity: Quantity = {
  number: 1,
  unitType: UnitType.Quantifiable
};
describe('sort-ingredients', () => {
  it('should group ingredients into type', () => {
    const ingredients: Ingredient[] = [
      {
        name: 'apple',
        type: 'veg',
        quantity
      },
      {
        name: 'grease',
        type: 'pantry',
        quantity
      },
      {
        name: 'zinc',
        type: 'veg',
        quantity
      }
    ];
    expect(sortIngredients(ingredients).map(i => i.name)).toEqual([
      'apple',
      'zinc',
      'grease'
    ]);
  });

  it('should put any untyped ingreeds at the end', () => {
    const ingredients: Ingredient[] = [
      {
        name: 'apple',
        type: 'veg',
        quantity
      },
      {
        name: 'grease',
        type: 'pantry',
        quantity
      },
      {
        name: 'friends',
        quantity
      },
      {
        name: 'zinc',
        type: 'veg',
        quantity
      }
    ];
    expect(sortIngredients(ingredients).map(i => i.name)).toEqual([
      'apple',
      'zinc',
      'grease',
      'friends'
    ]);
  });

  it('should sort ingredients in alphabetical order within their types', () => {
    const ingredients: Ingredient[] = [
      {
        name: 'zinc',
        type: 'veg',
        quantity
      },
      {
        name: 'grease',
        type: 'pantry',
        quantity
      },
      {
        name: 'apple',
        type: 'veg',
        quantity
      }
    ];
    expect(sortIngredients(ingredients).map(i => i.name)).toEqual([
      'apple',
      'zinc',
      'grease'
    ]);
  });
});
