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
  it("shouldn't merge incompatible units", () => {
    expect(
      mergeIngredients([
        '100ml mango juice',
        '50ml mango juice',
        '75g mango scrapings'
      ])
    ).toEqual(['150ml mango juice', '75g mango scrapings']);
  });

  it('should handle fractional quantities', () => {
    expect(mergeIngredients(['0.5 banana', '1 banana'])).toEqual([
      '1.5 banana'
    ]);
  });
  it('should handle fractional quantities with units', () => {
    expect(mergeIngredients(['0.5mg beans', '1mg beans'])).toEqual([
      '1.5mg beans'
    ]);
  });
  it('should convert ½ to 0.5', () => {
    expect(mergeIngredients(['½ banana', '1 banana'])).toEqual(['1.5 banana']);
  });

  it('should work with abritrary string amounts', () => {
    expect(mergeIngredients(['some beans', 'some beans'])).toEqual([
      '2 x some beans'
    ]);
  });
  it('should work with 1 abritrary string amount', () => {
    expect(mergeIngredients(['some beans'])).toEqual(['some beans']);
  });
});
