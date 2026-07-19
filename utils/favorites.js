const FAVORITES_KEY = 'chronology:favorites:v1';
const RECENT_KEY = 'chronology:recent:v1';
const FAVORITES_LIMIT = 200;
const RECENT_LIMIT = 50;

function validEntry(item) {
  return item
    && (item.type === 'person' || item.type === 'event')
    && item.id
    && item.name;
}

function readList(key, limit) {
  try {
    const value = wx.getStorageSync(key);
    if (!Array.isArray(value)) return [];
    return value.filter(validEntry).slice(0, limit);
  } catch (error) {
    return [];
  }
}

function writeList(key, items, limit) {
  const value = items.filter(validEntry).slice(0, limit);
  wx.setStorageSync(key, value);
  return value;
}

function toEntry(item) {
  return {
    type: item.type,
    id: item.id,
    name: item.name,
    ts: Date.now(),
  };
}

function getFavorites() {
  return readList(FAVORITES_KEY, FAVORITES_LIMIT);
}

function getRecent() {
  return readList(RECENT_KEY, RECENT_LIMIT)
    .sort((a, b) => b.ts - a.ts);
}

function isFavorite(type, id) {
  return getFavorites().some(item => item.type === type && item.id === id);
}

function toggleFavorite(item) {
  const current = getFavorites();
  const index = current.findIndex(entry => entry.type === item.type && entry.id === item.id);
  if (index !== -1) {
    current.splice(index, 1);
    writeList(FAVORITES_KEY, current, FAVORITES_LIMIT);
    return false;
  }
  const next = [toEntry(item)].concat(current);
  writeList(FAVORITES_KEY, next, FAVORITES_LIMIT);
  return true;
}

function recordRecent(item) {
  const current = getRecent().filter(entry => !(entry.type === item.type && entry.id === item.id));
  return writeList(RECENT_KEY, [toEntry(item)].concat(current), RECENT_LIMIT);
}

module.exports = {
  getFavorites,
  getRecent,
  isFavorite,
  toggleFavorite,
  recordRecent,
};
