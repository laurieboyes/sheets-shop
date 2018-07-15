import parseIngredients from './parse-ingredients';
import Ingredient from './types/ingredient';
import UnitType from './types/unit-type';

describe('parse-ingredients', () => {
  it('should work on with quantities without units', () => {
    const ingredientStrs = ['1 lemon'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1,
          unitType: UnitType.Quantifiable
        },
        name: 'lemon'
      }
    ];
    expect(parseIngredients(ingredientStrs, {})).toEqual(expectedResult);
  });
  it('should work on with quantities with units', () => {
    const ingredientStrs = ['100ml mango juice'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 100,
          unit: 'ml',
          unitType: UnitType.Quantifiable
        },
        name: 'mango juice'
      }
    ];
    expect(parseIngredients(ingredientStrs, {})).toEqual(expectedResult);
  });
  it('should handle fractional quantities', () => {
    const ingredientStrs = ['0.5 banana'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 0.5,
          unitType: UnitType.Quantifiable
        },
        name: 'banana'
      }
    ];
    expect(parseIngredients(ingredientStrs, {})).toEqual(expectedResult);
  });
  it('should handle fractional quantities with units', () => {
    const ingredientStrs = ['0.5mg beans'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 0.5,
          unit: 'mg',
          unitType: UnitType.Quantifiable
        },
        name: 'beans'
      }
    ];
    expect(parseIngredients(ingredientStrs, {})).toEqual(expectedResult);
  });

  it('should convert ½ to 0.5', () => {
    const ingredientStrs = ['½ banana'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 0.5,
          unitType: UnitType.Quantifiable
        },
        name: 'banana'
      }
    ];
    expect(parseIngredients(ingredientStrs, {})).toEqual(expectedResult);
  });

  it('should work with abritrary string amounts', () => {
    const ingredientStrs = ['some beans'];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1,
          unit: 'some',
          unitType: UnitType.Arbitrary
        },
        name: 'beans'
      }
    ];
    expect(parseIngredients(ingredientStrs, {})).toEqual(expectedResult);
  });

  it("should add the type if there's one in the provided map for the ingredient with this name", () => {
    const ingredientStrs = ['some beans'];
    const typesMap = {
      beans: 'pantry'
    };
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1,
          unit: 'some',
          unitType: UnitType.Arbitrary
        },
        name: 'beans',
        type: 'pantry'
      }
    ];
    expect(parseIngredients(ingredientStrs, typesMap)).toEqual(expectedResult);
  });

  it('should disregard anything in brackets when looking for the type', () => {
    const ingredientStrs = ['some beans (optional beans)'];
    const typesMap = {
      beans: 'pantry'
    };
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1,
          unit: 'some',
          unitType: UnitType.Arbitrary
        },
        name: 'beans (optional beans)',
        type: 'pantry'
      }
    ];
    expect(parseIngredients(ingredientStrs, typesMap)).toEqual(expectedResult);
  });
});
