# Sheets Shop

A thing I made to make my life marginally easier.

Refers to a [spreadsheet that's formatted like this one](https://docs.google.com/spreadsheets/d/1jxZ8m7SKLJ4_YwjqKP6gg3QKQIGM7Ch9Bnv0Ttu5zkI/edit?usp=sharing), and for the selected meals, creates a nice convenient shopping list.

Ingredients that are shared by different meals have their quantites merged.

Ingredients are grouped roughly into supermarket areas as specified in the spreadsheet (e.g. 'chilled', 'frozen')

## Rolling your own

Take a copy of the [template spreadsheet](https://docs.google.com/spreadsheets/d/1jxZ8m7SKLJ4_YwjqKP6gg3QKQIGM7Ch9Bnv0Ttu5zkI/edit?usp=sharing).

Deploy this to your AWS account and provide the following environment variables:

- SHEETS_API_KEY (for how to get one, see the [Google Sheets API: Authorise Requests](https://developers.google.com/sheets/api/guides/authorizing) page)
- SPREADSHEET_ID (get from the URL of your meal spreadsheet)

## Working locally

Start with `npm install`

Add in an env.json file with the properties detailed above.

Run with `npm start`

Run unit tests with `npm test`
