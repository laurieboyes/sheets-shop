import mergeIngredients from '../src/merge-ingredients';
import Ingredient from '../src/types/ingredient';
import UnitType from '../src/types/unit-type';

describe('merge-ingredients', () => {
  it('should merge plurals and singles where s is the plural form', () => {
    const unmergedIngredients: Ingredient[] = [
      {
        name: 'lemon',
        quantity: {
          number: 1,
          unitType: UnitType.Quantifiable
        }
      },
      {
        name: 'lemons',
        quantity: {
          number: 2,
          unitType: UnitType.Quantifiable
        }
      }
    ];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 3,
          unitType: UnitType.Quantifiable
        },
        name: 'lemon'
      }
    ];
    expect(mergeIngredients(unmergedIngredients)).toEqual(expectedResult);
  });
  it('should work with units', () => {
    const unmergedIngredients: Ingredient[] = [
      {
        name: 'mango juice',
        quantity: {
          number: 100,
          unit: 'ml',
          unitType: UnitType.Quantifiable
        }
      },
      {
        name: 'mango juice',
        quantity: {
          number: 50,
          unit: 'ml',
          unitType: UnitType.Quantifiable
        }
      }
    ];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 150,
          unit: 'ml',
          unitType: UnitType.Quantifiable
        },
        name: 'mango juice'
      }
    ];
    expect(mergeIngredients(unmergedIngredients)).toEqual(expectedResult);
  });
  it("shouldn't merge incompatible units", () => {
    const unmergedIngredients: Ingredient[] = [
      {
        name: 'mango',
        quantity: {
          number: 100,
          unit: 'g',
          unitType: UnitType.Quantifiable
        }
      },
      {
        name: 'mango',
        quantity: {
          number: 50,
          unit: 'g',
          unitType: UnitType.Quantifiable
        }
      },
      {
        name: 'mango',
        quantity: {
          number: 5,
          unit: 'oz',
          unitType: UnitType.Quantifiable
        }
      }
    ];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 150,
          unit: 'g',
          unitType: UnitType.Quantifiable
        },
        name: 'mango'
      },
      {
        quantity: {
          number: 5,
          unit: 'oz',
          unitType: UnitType.Quantifiable
        },
        name: 'mango'
      }
    ];
    expect(mergeIngredients(unmergedIngredients)).toEqual(expectedResult);
  });

  it('should handle fractional quantities', () => {
    const unmergedIngredients: Ingredient[] = [
      {
        name: 'banana',
        quantity: {
          number: 0.5,
          unitType: UnitType.Quantifiable
        }
      },
      {
        name: 'banana',
        quantity: {
          number: 1,
          unitType: UnitType.Quantifiable
        }
      }
    ];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1.5,
          unitType: UnitType.Quantifiable
        },
        name: 'banana'
      }
    ];
    expect(mergeIngredients(unmergedIngredients)).toEqual(expectedResult);
  });
  it('should handle fractional quantities with units', () => {
    const unmergedIngredients: Ingredient[] = [
      {
        name: 'beans',
        quantity: {
          number: 0.5,
          unit: 'mg',
          unitType: UnitType.Quantifiable
        }
      },
      {
        name: 'beans',
        quantity: {
          number: 1,
          unit: 'mg',
          unitType: UnitType.Quantifiable
        }
      }
    ];
    const expectedResult: Ingredient[] = [
      {
        quantity: {
          number: 1.5,
          unit: 'mg',
          unitType: UnitType.Quantifiable
        },
        name: 'beans'
      }
    ];
    expect(mergeIngredients(unmergedIngredients)).toEqual(expectedResult);
  });

  it('should work with abritrary string amounts', () => {
    const unmergedIngredients: Ingredient[] = [
      {
        name: 'beans',
        quantity: {
          number: 1,
          unit: 'some',
          unitType: UnitType.Arbitrary
        }
      },
      {
        name: 'beans',
        quantity: {
          number: 1,
          unit: 'some',
          unitType: UnitType.Arbitrary
        }
      }
    ];
    const expectedResult: Ingredient[] = [
      {
        name: 'beans',
        quantity: {
          number: 2,
          unit: 'some',
          unitType: UnitType.Arbitrary
        }
      }
    ];
    expect(mergeIngredients(unmergedIngredients)).toEqual(expectedResult);
  });
});
