import stringifyIngredient from './stringify-ingredient';
import Ingredient from './types/ingredient';
import UnitType from './types/unit-type';

describe('stringify-ingredients', () => {
  it('should stringify quantifiable ingredients', () => {
    const ingredient: Ingredient = {
      name: 'lemon',
      quantity: {
        number: 1,
        unitType: UnitType.Quantifiable
      }
    };
    expect(stringifyIngredient(ingredient)).toEqual('1 lemon');
  });

  it('should stringify quantifiable ingredients with units', () => {
    const ingredient: Ingredient = {
      name: 'lemon scrapings',
      quantity: {
        number: 20,
        unit: 'mg',
        unitType: UnitType.Quantifiable
      }
    };
    expect(stringifyIngredient(ingredient)).toEqual('20mg lemon scrapings');
  });
  it('should stringify single arbitrary unit ingredients', () => {
    const ingredient: Ingredient = {
      name: 'stuff',
      quantity: {
        number: 1,
        unit: 'some',
        unitType: UnitType.Arbitrary
      }
    };
    expect(stringifyIngredient(ingredient)).toEqual('some stuff');
  });

  it('should stringify multiple arbitrary unit ingredients', () => {
    const ingredient: Ingredient = {
      name: 'stuff',
      quantity: {
        number: 3,
        unit: 'some',
        unitType: UnitType.Arbitrary
      }
    };
    expect(stringifyIngredient(ingredient)).toEqual('3 x some stuff');
  });
});
