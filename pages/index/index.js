const knowledge = require('../../data/historyKnowledge');
const curriculum = require('../../data/curriculumIndex');
const { getDynastyTagInfo } = require('../../data/dynastyTagGlossary');
const { formatHistoricalName } = require('../../data/namePronunciations');
const { buildPersonRows } = require('../../data/personGridLayout');

function normalizeIdentity(value) {
  return String(value || '').replace(/（.*?）/g, '').replace(/[·\s]/g, '');
}

const existingPersonNames = new Set(knowledge.persons
  .reduce((names, person) => names.concat([person.name, person.formalName]), [])
  .map(normalizeIdentity));
const curriculumPeople = curriculum.people.filter(person => !existingPersonNames.has(normalizeIdentity(person.name)));
const curriculumPersonIds = new Set(curriculumPeople.map(person => person.id));
const curriculumEvents = curriculum.events.filter(event => (event.relatedPersonIds || []).some(id => curriculumPersonIds.has(id)));
const curriculumEventIds = new Set(curriculumEvents.map(event => event.id));
const curriculumRelationships = curriculum.relationships.filter(edge => (
  curriculumPersonIds.has(edge.sourceId) && curriculumPersonIds.has(edge.targetId)
));
const dynastyOrder = Object.fromEntries(knowledge.dynasties.map(item => [item.id, item.order]));

function compareStroke(a, b) {
  try {
    return String(a).localeCompare(String(b), 'zh-Hans-CN-u-co-stroke');
  } catch (error) {
    return String(a).localeCompare(String(b), 'zh-Hans-CN');
  }
}

function searchScore(item, keyword) {
  const query = String(keyword || '').trim().toLowerCase();
  if (!query) return 9;
  const name = String(item.name || '').toLowerCase();
  if (name === query || normalizeIdentity(name) === normalizeIdentity(query)) return 0;
  if (name.indexOf(query) === 0) return 1;
  if (name.indexOf(query) !== -1) return 2;
  return 8;
}

function comparePerson(a, b, keyword) {
  const score = searchScore(a, keyword) - searchScore(b, keyword);
  if (score) return score;
  const order = (dynastyOrder[a.dynastyId] || 999) - (dynastyOrder[b.dynastyId] || 999);
  if (order) return order;
  const aYear = Number.isFinite(a.birthYear) ? a.birthYear : null;
  const bYear = Number.isFinite(b.birthYear) ? b.birthYear : null;
  if (aYear !== null && bYear !== null && aYear !== bYear) return aYear - bYear;
  if (aYear !== null) return -1;
  if (bYear !== null) return 1;
  return compareStroke(a.name, b.name);
}

function parseStartYear(value) {
  const match = String(value || '').match(/(前)?(\d{1,4})/);
  return match ? Number(match[2]) * (match[1] ? -1 : 1) : null;
}

function compareEvent(a, b, keyword) {
  const score = searchScore(a, keyword) - searchScore(b, keyword);
  if (score) return score;
  const aYear = parseStartYear(a.dateText);
  const bYear = parseStartYear(b.dateText);
  if (aYear !== null && bYear !== null && aYear !== bYear) return aYear - bYear;
  if (aYear !== null) return -1;
  if (bYear !== null) return 1;
  return 0;
}

function toPersonListItem(person) {
  return {
    id: person.id,
    name: formatHistoricalName(person.name),
    lifeText: person.lifeText,
    categoryText: person.categoryText,
    summary: person.summary,
    crossText: person.crossText,
    avatarPath: person.isFeaturedAvatar ? `/assets/avatars/${person.id}.jpg` : person.avatarPath,
    avatarInitial: person.avatarInitial,
    isFeaturedAvatar: person.isFeaturedAvatar,
    isCurriculum: person.isCurriculum,
  };
}

function toRulerListItem(ruler) {
  return {
    id: ruler.id,
    name: formatHistoricalName(ruler.name),
    dynastyName: ruler.dynastyName,
    polity: ruler.polity,
    reignText: ruler.reignText,
    linkedPersonId: ruler.linkedPersonId,
    hasDetail: ruler.hasDetail,
    isFeatured: ruler.isFeatured,
    detailText: ruler.detailText,
    personalName: formatHistoricalName(ruler.personalName),
    recordBasisText: ruler.recordBasisText,
    summary: ruler.summary,
    tagText: ruler.tagText,
  };
}

function toEventListItem(event) {
  return {
    id: event.id,
    name: event.name,
    dateText: event.dateText,
    periodLabel: event.periodLabel,
    summary: event.summary,
    tagText: event.tagText,
    isCurriculum: event.isCurriculum,
  };
}

function toDynastyListItem(dynasty) {
  return {
    id: dynasty.id,
    order: dynasty.order,
    dateText: dynasty.dateText,
    name: dynasty.name,
    summary: dynasty.summary,
    status: dynasty.status,
    statusText: dynasty.statusText,
    labels: dynasty.labels,
    isExpanded: dynasty.isExpanded,
    emperors: dynasty.emperors.map(toRulerListItem),
    otherRulers: dynasty.otherRulers.map(toRulerListItem),
    periods: dynasty.periods.map(period => {
      const people = period.people.map(person => ({ id: person.id, name: formatHistoricalName(person.name) }));
      return {
        id: period.id,
        name: period.name,
        dateText: period.dateText,
        ruler: formatHistoricalName(period.ruler),
        emperorPeople: period.emperorPeople.map(person => ({ id: person.id, name: formatHistoricalName(person.name) })),
        personRows: buildPersonRows(people),
        visiblePersonCount: people.length,
        events: period.events.map(event => ({ id: event.id, name: event.name, dateText: event.dateText })),
        personTotal: period.personTotal || period.people.length + period.emperorPeople.length,
        eventTotal: period.eventTotal || period.events.length,
        isCurriculum: !!period.isCurriculum,
      };
    }),
    states: dynasty.states.map(state => ({
      name: state.name,
      group: state.group,
      dateText: state.dateText,
      overlapText: state.overlapText,
    })),
  };
}

Page({
  data: {
    stats: {
      ...knowledge.stats,
      totalPersonCount: knowledge.persons.length + curriculumPeople.length,
      eventCount: knowledge.events.length + curriculumEvents.length,
      relationshipCount: knowledge.relationships.length + curriculumRelationships.length,
    },
    keyword: '',
    activeMode: 'dynasty',
    modes: [
      { id: 'dynasty', name: '朝代' },
      { id: 'ruler', name: '帝王' },
      { id: 'person', name: '人物' },
      { id: 'event', name: '事件' },
    ],
    expandedDynastyIds: ['qin'],
    pageSize: 40,
    resultLimit: 40,
    dynasties: [],
    rulers: [],
    rulerTotal: 0,
    persons: [],
    personTotal: 0,
    events: [],
    eventTotal: 0,
    hasMore: false,
    showBackTop: false,
    tagDialogVisible: false,
    activeTagInfo: null,
  },

  onLoad() {
    this.refresh();
  },

  refresh() {
    const { keyword, expandedDynastyIds, activeMode, resultLimit } = this.data;
    const matchedRulers = activeMode === 'ruler' ? knowledge.searchRulers(keyword) : [];
    const matchedPersons = activeMode === 'person'
      ? knowledge.searchPersons(keyword)
        .concat(curriculum.searchPeople(keyword).filter(person => curriculumPersonIds.has(person.id)))
        .sort((a, b) => comparePerson(a, b, keyword))
      : [];
    const matchedEvents = activeMode === 'event'
      ? knowledge.searchEvents(keyword)
        .concat(curriculum.searchEvents(keyword).filter(event => curriculumEventIds.has(event.id)))
        .sort((a, b) => compareEvent(a, b, keyword))
      : [];
    const activeTotal = activeMode === 'ruler'
      ? matchedRulers.length
      : activeMode === 'person'
        ? matchedPersons.length
        : activeMode === 'event'
          ? matchedEvents.length
          : 0;
    this.setData({
      dynasties: knowledge.getDynastyView(keyword, expandedDynastyIds).map(dynasty => {
        if (!dynasty.isExpanded) return dynasty;
        const expansion = curriculum.getDynastyExpansion(dynasty.id);
        if (!expansion) return dynasty;
        const people = expansion.people.filter(person => curriculumPersonIds.has(person.id));
        const events = expansion.events.filter(event => curriculumEventIds.has(event.id));
        return {
          ...dynasty,
          periods: dynasty.periods.concat({
            ...expansion,
            people: people.slice(0, 8),
            events: events.slice(0, 5),
            personTotal: people.length,
            eventTotal: events.length,
            emperorPeople: [],
          }),
        };
      }).map(toDynastyListItem),
      rulers: matchedRulers.slice(0, resultLimit).map(toRulerListItem),
      rulerTotal: matchedRulers.length,
      persons: matchedPersons.slice(0, resultLimit).map(toPersonListItem),
      personTotal: matchedPersons.length,
      events: matchedEvents.slice(0, resultLimit).map(toEventListItem),
      eventTotal: matchedEvents.length,
      hasMore: activeTotal > resultLimit,
    });
  },

  onSearchInput(e) {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.setData({
      keyword: e.detail.value,
      resultLimit: this.data.pageSize,
    });
    this.searchTimer = setTimeout(() => this.refresh(), 180);
  },

  onSearchConfirm() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.refresh();
  },

  onUnload() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
  },

  onPageScroll(e) {
    const showBackTop = e.scrollTop > 900;
    if (showBackTop !== this.data.showBackTop) this.setData({ showBackTop });
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 260 });
  },

  showTagInfo(e) {
    const { label, dynasty } = e.currentTarget.dataset;
    const activeTagInfo = getDynastyTagInfo(label, dynasty);
    if (!activeTagInfo) return;
    this.setData({
      tagDialogVisible: true,
      activeTagInfo,
    });
  },

  closeTagInfo() {
    this.setData({
      tagDialogVisible: false,
      activeTagInfo: null,
    });
  },

  stopTagDialogTap() {},

  preventTouchMove() {},

  clearSearch() {
    this.setData({
      keyword: '',
      resultLimit: this.data.pageSize,
    }, () => this.refresh());
  },

  switchMode(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      activeMode: id,
      resultLimit: this.data.pageSize,
    }, () => {
      this.refresh();
      wx.pageScrollTo({ scrollTop: 0, duration: 220 });
    });
  },

  toggleDynasty(e) {
    const id = e.currentTarget.dataset.id;
    const expandedDynastyIds = this.data.expandedDynastyIds.slice();
    const index = expandedDynastyIds.indexOf(id);
    if (index === -1) {
      expandedDynastyIds.push(id);
    } else {
      expandedDynastyIds.splice(index, 1);
    }
    this.setData({ expandedDynastyIds }, () => this.refresh());
  },

  expandAllDynasties() {
    this.setData({
      expandedDynastyIds: knowledge.dynasties.map(item => item.id),
    }, () => this.refresh());
  },

  collapseAllDynasties() {
    this.setData({ expandedDynastyIds: [] }, () => this.refresh());
  },

  goPerson(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: id.indexOf('curr-') === 0
        ? `/curriculum-package/pages/person/person?id=${id}`
        : `/person-package/pages/person/person?id=${id}`,
    });
  },

  goRuler(e) {
    const id = e.currentTarget.dataset.personId;
    if (id) {
      wx.navigateTo({
        url: `/person-package/pages/person/person?id=${id}`,
      });
      return;
    }
    wx.showToast({
      title: '人物资料加载失败',
      icon: 'none',
    });
  },

  loadMore() {
    this.setData({
      resultLimit: this.data.resultLimit + this.data.pageSize,
    }, () => this.refresh());
  },

  goEvent(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: id.indexOf('curr-event-') === 0
        ? `/curriculum-package/pages/event/event?id=${id}`
        : `/pages/event/event?id=${id}`,
    });
  },

  openDynastyExpansion(e) {
    this.setData({
      activeMode: e.currentTarget.dataset.mode,
      keyword: e.currentTarget.dataset.dynasty,
      resultLimit: this.data.pageSize,
    }, () => {
      this.refresh();
      wx.pageScrollTo({ scrollTop: 0, duration: 220 });
    });
  },
});
