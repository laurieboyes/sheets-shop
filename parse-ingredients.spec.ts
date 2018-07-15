import mergeIngredients from './merge-ingredients';
import Ingredient from './types/ingredient';

describe('merge-ingredients', () => {
  it('should work on with quantities without units', () => {
    const ingredientStrs = ['1 lemon'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1
        },
        name: 'lemon'
      }
    ];
    expect(mergeIngredients(ingredientStrs)).toEqual(expectedResult);
  });
  it('should work on with quantities with units', () => {
    const ingredientStrs = ['100ml mango juice'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 100,
          unit: 'ml'
        },
        name: 'mango juice'
      }
    ];
    expect(mergeIngredients(ingredientStrs)).toEqual(expectedResult);
  });
  it('should handle fractional quantities', () => {
    const ingredientStrs = ['0.5 banana'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 0.5
        },
        name: 'banana'
      }
    ];
    expect(mergeIngredients(ingredientStrs)).toEqual(expectedResult);
  });
  it('should handle fractional quantities with units', () => {
    const ingredientStrs = ['0.5mg beans'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 0.5,
          unit: 'mg'
        },
        name: 'beans'
      }
    ];
    expect(mergeIngredients(ingredientStrs)).toEqual(expectedResult);
  });

  it('should convert ½ to 0.5', () => {
    const ingredientStrs = ['½ banana'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 0.5
        },
        name: 'banana'
      }
    ];
    expect(mergeIngredients(ingredientStrs)).toEqual(expectedResult);
  });

  it('should work with abritrary string amounts', () => {
    const ingredientStrs = ['some beans'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1,
          unit: 'some',
          unitType: 'arbitrary'
        },
        name: 'beans'
      }
    ];
    expect(mergeIngredients(ingredientStrs)).toEqual(expectedResult);
  });
});
