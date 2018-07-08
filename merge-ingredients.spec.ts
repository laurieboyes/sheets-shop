import mergeIngredients from './merge-ingredients';

describe('merge-ingredients', () => {
  it('merge plurals and singles where s is the plural form', () => {
    expect(mergeIngredients(['1 lemon', '2 lemons'])).toEqual(['3 lemon']);
  });
});
