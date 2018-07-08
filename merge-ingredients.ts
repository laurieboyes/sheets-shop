function parseQuantity(quantityStr) {
  if (quantityStr.match(/^\d+$/)) {
    return {
      amount: +quantityStr
    };
  } else if (/^\d+[a-z]+$/.test(quantityStr)) {
    const matches = quantityStr.match(/^(\d+)([a-z]+)$/);
    return {
      unit: matches[2],
      amount: +matches[1]
    };
  } else if (/^[a-zA-Z ]+$/.test(quantityStr)) {
    return {
      unit: quantityStr,
      amount: 1,
      unitType: 'arbitrary'
    };
  } else {
    throw new Error('Wth is this quantity? ' + quantityStr);
  }
}

export default function(ingredients) {
  const mergedList = [];

  ingredients.forEach(ingredientStr => {
    const quantity = parseQuantity(ingredientStr.split(' ')[0].toLowerCase());
    const itemName = ingredientStr
      .split(' ')
      .slice(1)
      .join(' ');

    // stemmer-lite
    const itemMatches = [itemName];
    if (itemName.slice(-1) === 's') {
      itemMatches.push(itemName.slice(0, itemName.length - 1));
    }

    const itemAlreadyMerged = mergedList.find(mergedListItem =>
      itemMatches.includes(mergedListItem.name)
    );

    if (!itemAlreadyMerged) {
      // if it's not already in there, stick it in
      mergedList.push({
        name: itemName,
        ...quantity
      });
    } else {
      // else, inc the quantity
      itemAlreadyMerged.amount += quantity.amount;
    }
  });

  return mergedList.map(item => {
    let quantity;
    if (item.unitType === 'arbitrary') {
      if (item.amount === 1) {
        quantity = item.unit;
      } else {
        quantity = `${item.amount} x ${item.unit}`;
      }
    } else {
      quantity = `${item.amount}${item.unit ? item.unit : ''}`;
    }
    return `${quantity} ${item.name}`;
  });
}
