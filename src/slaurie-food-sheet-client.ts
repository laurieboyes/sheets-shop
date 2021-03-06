const queryString = require('querystring');
import fetch from 'node-fetch';

const MEAL_SELECT_ROW_INDEX = 1;
const MULTIPLIER_ROW_INDEX = 2;

export async function getIngredientStrings(): Promise<string[]> {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const q = queryString.stringify({
    key: process.env.SHEETS_API_KEY,
    ranges: ['Ingredients!A:AV'],
    majorDimension: 'COLUMNS'
  });

  const allMealsJson = await (await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${q}`
  )).json();

  if (allMealsJson.error) {
    if (allMealsJson.error.code == 404) {
      throw new Error(
        `Couldn't find spreadsheet with ID '${process.env.SPREADSHEET_ID}'`
      );
    } else {
      throw new Error(
        `${allMealsJson.error.code} ${allMealsJson.error.message}`
      );
    }
  }

  const allMeals = allMealsJson.valueRanges[0].values;

  const chosenMeals = allMeals.filter(
    meal => meal[MEAL_SELECT_ROW_INDEX] === 'TRUE'
  );

  const allIngredients = chosenMeals.reduce((bigList, thisList) => {
    return bigList.concat(
      thisList.slice(3).map(ingreed => {
        const multiplier = thisList[MULTIPLIER_ROW_INDEX] || 1;
        return `${ingreed} x ${multiplier}`;
      })
    );
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

  const ingredientTypesJson = await (await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${q}`
  )).json();

  if (ingredientTypesJson.error) {
    if (ingredientTypesJson.error.code == 404) {
      throw new Error(
        `Couldn't find spreadsheet with ID '${process.env.SPREADSHEET_ID}'`
      );
    } else {
      throw new Error(
        `${ingredientTypesJson.error.code} ${ingredientTypesJson.error.message}`
      );
    }
  }

  const ingredientTypes = ingredientTypesJson.valueRanges[0].values;

  const ingredientTypesMap = {};
  ingredientTypes.forEach(([name, type]) => {
    ingredientTypesMap[name] = type;
  });

  return ingredientTypesMap;
}
