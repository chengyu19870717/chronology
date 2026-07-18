const { persons, decoratePerson } = require('../data/historyKnowledge');

const prompts = persons.map(source => {
  const person = decoratePerson(source);
  return {
    id: person.id,
    name: person.name,
    avatarPath: person.avatarPath,
    positivePrompt: person.avatarPrompt,
    negativePrompt: person.avatarNegativePrompt,
  };
});

console.log(JSON.stringify(prompts, null, 2));
