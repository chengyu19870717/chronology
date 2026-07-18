const { persons, decoratePerson } = require('../data/historyKnowledge');
const { getAvatarProfile } = require('../data/avatarPrompts');

const prompts = persons.map(source => {
  const person = decoratePerson(source);
  const avatar = getAvatarProfile(source);
  return {
    id: person.id,
    name: person.name,
    avatarPath: person.avatarPath,
    positivePrompt: avatar.positive,
    negativePrompt: avatar.negative,
  };
});

console.log(JSON.stringify(prompts, null, 2));
