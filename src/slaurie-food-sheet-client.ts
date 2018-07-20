const queryString = require('querystring');
import fetch from 'node-fetch';

const MEAL_SELECT_ROW_INDEX = 1;

export async function getIngredientStrings(): Promise<string[]> {
  const spreadsheetId = process.env.SPREADSHEET_ID;
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

export async function getIngredientTypesMap() {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const q = queryString.stringify({
    key: process.env.SHEETS_API_KEY,
    ranges: ['Ingredient types!A:B'],
    majorDimension: 'ROWS'
  });

  const ingredientTypes = (await (await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${q}`
  )).json()).valueRanges[0].values;

  const ingredientTypesMap = {};
  ingredientTypes.forEach(([name, type]) => {
    ingredientTypesMap[name] = type;
  });

  return ingredientTypesMap;
}
