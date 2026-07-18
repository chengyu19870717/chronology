const SHORT_NAME_LIMIT = 8.5;

function getPersonNameVisualLength(value) {
  return Array.from(String(value || '')).reduce((total, character) => {
    if (/\s/.test(character)) return total + 0.25;
    if (/[A-Za-z0-9]/.test(character)) return total + 0.55;
    if (/[·.,，。:：;；()（）\-—]/.test(character)) return total + 0.45;
    return total + 1;
  }, 0);
}

function isShortPersonName(name) {
  return getPersonNameVisualLength(name) <= SHORT_NAME_LIMIT;
}

function buildPersonRows(people) {
  const sizes = [];
  let index = 0;
  while (index < people.length) {
    const remaining = people.length - index;
    const nextThreeAreShort = remaining >= 3
      && people.slice(index, index + 3).every(person => isShortPersonName(person.name));
    if (nextThreeAreShort) sizes.push(3);
    else if (remaining === 3 && !isShortPersonName(people[index].name)) sizes.push(1);
    else sizes.push(Math.min(2, remaining));
    index += sizes[sizes.length - 1];
  }

  index = 0;
  return sizes.map(size => {
    const rowPeople = people.slice(index, index + size);
    index += size;
    return {
      key: `${rowPeople[0].id}-${size}`,
      columns: size === 3 ? 3 : 2,
      isSingle: size === 1,
      people: rowPeople,
    };
  });
}

module.exports = {
  SHORT_NAME_LIMIT,
  getPersonNameVisualLength,
  isShortPersonName,
  buildPersonRows,
};
