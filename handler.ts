const queryString = require('querystring');
import fetch from 'node-fetch';
import mergeIngredients from './merge-ingredients';

const MEAL_SELECT_ROW_INDEX = 1;

async function getIngredients() {
  const spreadsheetId = '1A67bs-DAERPQBBPzIqszfQgUpoZuji4axrIio1UoP4E';
  const q = queryString.stringify({
    key: process.env.SHEETS_API_KEY,
    ranges: ['Ingredients!A:AV'],
    majorDimension: 'COLUMNS'
  });

  const allMeals = (await (await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${q}`
  )).json()).valueRanges[0].values;

  const chosenMeals = allMeals.filter(
    meal => meal[MEAL_SELECT_ROW_INDEX] === 'TRUE'
  );

  const allIngredients = chosenMeals.reduce((bigList, thisList) => {
    return bigList.concat(thisList.slice(2));
  }, []);

  return allIngredients;
}

export async function hello(event, context, callback) {
  try {
    const bigJumbledListOfIngredients = await getIngredients();
    const mergedIngredients = mergeIngredients(bigJumbledListOfIngredients);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'got my stuff',
        mergedIngredients
      })
    };
    callback(null, response);
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      })
    };
    callback(null, response);
  }
}
