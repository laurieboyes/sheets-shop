import mergeIngredients from './merge-ingredients';

describe('merge-ingredients', () => {
  it('should merge plurals and singles where s is the plural form', () => {
    expect(mergeIngredients(['1 lemon', '2 lemons'])).toEqual(['3 lemon']);
  });
  it('should work with units', () => {
    expect(mergeIngredients(['100ml mango juice', '50ml mango juice'])).toEqual(
      ['150ml mango juice']
    );
  });
});
