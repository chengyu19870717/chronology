const HOME_SHARE = {
  title: '中国编年史速查表 · 1101 位人物一查即得',
  path: '/pages/index/index',
};

function truncate(value, maxLength) {
  const text = String(value || '').trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

function homeShare() {
  return { ...HOME_SHARE };
}

function eventShare(event) {
  if (!event || !event.id || !event.name) return homeShare();
  return {
    title: event.name,
    path: `/pages/event/event?id=${event.id}`,
    query: `id=${event.id}`,
  };
}

function curriculumEventShare(event) {
  if (!event || !event.id || !event.name) return homeShare();
  return {
    title: event.name,
    path: `/curriculum-package/pages/event/event?id=${event.id}`,
    query: `id=${event.id}`,
  };
}

function personShare(person, path) {
  if (!person || !person.id || !person.name) return homeShare();
  const summary = truncate(person.summary, 30);
  const result = {
    title: summary ? `${person.name} · ${summary}` : person.name,
    path: `${path}?id=${person.id}`,
    query: `id=${person.id}`,
  };
  if (person.avatarPath && person.hasAvatar !== false) result.imageUrl = person.avatarPath;
  return result;
}

module.exports = {
  homeShare,
  eventShare,
  curriculumEventShare,
  personShare,
};
