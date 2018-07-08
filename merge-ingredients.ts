export default function(ingredients) {
  const mergedList = [];

  ingredients.forEach(ingredientStr => {
    const quantity = +ingredientStr.split(' ')[0];
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
        quantity
      });
    } else {
      // else, inc the quantity
      itemAlreadyMerged.quantity += quantity;
    }
  });

  return mergedList.map(item => {
    return `${item.quantity} ${item.name}`;
  });
}
