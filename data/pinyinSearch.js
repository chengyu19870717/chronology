const index = require('./pinyinIndex');

function normalizeQuery(value) {
  return String(value || '').trim().toLowerCase().replace(/[^a-z]/g, '');
}

function scoreEntry(entry, keyword) {
  const query = normalizeQuery(keyword);
  if (!query || !entry) return 9;
  let score = 9;
  for (let index = 0; index < entry.length; index += 2) {
    const full = entry[index];
    const initials = entry[index + 1];
    if (full === query) score = Math.min(score, 0);
    else if (initials === query) score = Math.min(score, 1);
    else if (full && full.indexOf(query) === 0) score = Math.min(score, 2);
    else if (initials && initials.indexOf(query) === 0) score = Math.min(score, 3);
  }
  return score;
}

function personPinyinScore(id, keyword) {
  return scoreEntry(index.p[id], keyword);
}

function rulerPinyinScore(id, keyword) {
  return scoreEntry(index.r[id], keyword);
}

module.exports = {
  personPinyinScore,
  rulerPinyinScore,
};
