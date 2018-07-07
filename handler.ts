const queryString = require('querystring');
import fetch from 'node-fetch';

async function getStuff() {
  const spreadsheetId = '1A67bs-DAERPQBBPzIqszfQgUpoZuji4axrIio1UoP4E';
  const q = queryString.stringify({
    key: process.env.SHEETS_API_KEY,
    ranges: 'Big fan!A1:B2'
  });

  return await (await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${q}`
  )).json();
}

export async function hello(event, context, callback) {
  const rawStuff = await getStuff();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'got my stuff',
      rawStuff
    })
  };

  callback(null, response);
}
