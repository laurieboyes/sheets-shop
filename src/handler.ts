import mergeIngredients from './merge-ingredients';
import parseIngredients from './parse-ingredients';
import stringifyIngedient from './stringify-ingredient';
import sortIngredients from './sort-ingredients';
import {
  getIngredientStrings,
  getIngredientTypesMap
} from './slaurie-food-sheet-client';

export async function hello(event, context, callback) {
  try {
    const ingredientTypesMap = await getIngredientTypesMap();
    const ingredientStrings: string[] = await getIngredientStrings();

    const parsedIngredients = parseIngredients(
      ingredientStrings,
      ingredientTypesMap
    );
    const mergedIngredients = mergeIngredients(parsedIngredients);
    const sortedIngredients = sortIngredients(mergedIngredients);
    const stringifiedIngredients = sortedIngredients.map(i =>
      stringifyIngedient(i)
    );

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'got my stuff',
        stringifiedIngredients
      })
    };
    callback(null, response);
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      })
    };
    callback(null, response);
  }
}
