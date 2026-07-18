const knowledge = require('../../../data/historyKnowledge');
const curriculum = require('../../../data/curriculumIndex');
const { getPersonTagInfo } = require('../../../data/personTagGlossary');
const { formatHistoricalName } = require('../../../data/namePronunciations');
const { personShare } = require('../../../utils/share');
const { handleMissingEntry, clearMissingEntryTimer } = require('../../../utils/missingEntry');

function decorateResume(list) {
  return (list || []).map(item => ({
    ...item,
    equivalentText: item.modernEquivalent || '不宜直接类比，以下以管辖范围说明',
  }));
}

function toEventCard(event) {
  return {
    id: event.id,
    dateText: event.dateText,
    periodLabel: event.periodLabel,
    name: event.name,
    summary: event.summary,
    tagText: event.tagText,
  };
}

function toRelatedPerson(person) {
  return {
    id: person.id,
    name: formatHistoricalName(person.name),
    avatarPath: person.avatarPath,
    avatarInitial: person.avatarInitial,
    hasAvatar: person.hasAvatar,
  };
}

function toRelationship(edge) {
  return {
    sourceId: edge.sourceId,
    targetId: edge.targetId,
    otherId: edge.otherId,
    type: edge.type,
    summary: edge.summary,
    eventText: edge.eventText,
    positionClass: edge.positionClass,
    other: toRelatedPerson(edge.other),
  };
}

function getCurriculumRelationships(person) {
  const aliases = [person.name, person.formalName]
    .filter(Boolean)
    .reduce((items, name) => items.concat([name, String(name).replace(/（.*?）/g, '')]), []);
  const seen = new Set();
  const related = [];
  aliases.forEach(alias => {
    curriculum.getPeopleMentioning(alias).forEach(other => {
      if (seen.has(other.id)) return;
      seen.add(other.id);
      related.push({
        sourceId: person.id,
        targetId: other.id,
        otherId: other.id,
        type: '新增通史事件关联',
        summary: `${other.name}的核心线索“${other.focus}”直接涉及${alias}，可从新增人物端点进入同一历史过程。`,
        eventText: other.focus,
        positionClass: '',
        other: {
          id: other.id,
          name: other.name,
          avatarPath: '',
          avatarInitial: other.name.slice(0, 1),
          hasAvatar: false,
        },
      });
    });
  });
  return related;
}

Page({
  data: {
    person: null,
    resume: [],
    relatedEvents: [],
    relationships: [],
    graphRelationships: [],
    activeTab: 'resume',
    activeDisputeIndex: 0,
    activeDispute: null,
    avatarLoadFailed: false,
    showBackTop: false,
    tagDialogVisible: false,
    activeTagInfo: null,
    tabs: [
      { id: 'profile', name: '档案' },
      { id: 'resume', name: '履历' },
      { id: 'relations', name: '关系' },
      { id: 'events', name: '事件' },
      { id: 'debate', name: '争议' },
    ],
  },

  onLoad(options) {
    const source = knowledge.personMap[options.id];
    if (!source) {
      handleMissingEntry(this);
      return;
    }

    const decorated = knowledge.decoratePerson(source);
    const {
      avatarPrompt,
      avatarGenerationPrompt,
      avatarNegativePrompt,
      relatedEvents: rawRelatedEvents,
      ...person
    } = decorated;
    const relationships = knowledge.getPersonRelationships(person.id).map(toRelationship);
    const externalRelationships = getCurriculumRelationships(person)
      .filter(edge => !relationships.some(item => item.otherId === edge.otherId));
    relationships.push(...externalRelationships);
    wx.setNavigationBarTitle({ title: person.name });
    this.setData({
      person,
      resume: decorateResume(person.resume),
      relatedEvents: rawRelatedEvents.map(knowledge.decorateEvent).map(toEventCard),
      relationships,
      graphRelationships: relationships.slice(0, 6),
      activeDispute: person.disputeTabs[0] || null,
      avatarLoadFailed: false,
    });
  },

  onUnload() {
    clearMissingEntryTimer(this);
  },

  onShareAppMessage() {
    return personShare(this.data.person, '/person-package/pages/person/person');
  },

  onShareTimeline() {
    return personShare(this.data.person, '/person-package/pages/person/person');
  },

  switchTab(e) {
    const activeTab = e.currentTarget.dataset.tabId;
    if (!this.data.tabs.some(tab => tab.id === activeTab) || activeTab === this.data.activeTab) return;
    this.setData({ activeTab });
  },

  onPageScroll(e) {
    const showBackTop = e.scrollTop > 900;
    if (showBackTop !== this.data.showBackTop) this.setData({ showBackTop });
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 260 });
  },

  switchDispute(e) {
    const activeDisputeIndex = Number(e.currentTarget.dataset.index);
    this.setData({
      activeDisputeIndex,
      activeDispute: this.data.person.disputeTabs[activeDisputeIndex],
    });
  },

  onAvatarError() {
    this.setData({ avatarLoadFailed: true });
  },

  showTagInfo(e) {
    const activeTagInfo = getPersonTagInfo(
      e.currentTarget.dataset.label,
      this.data.person.name,
      this.data.person.activePeriodText,
    );
    if (!activeTagInfo) return;
    this.setData({ tagDialogVisible: true, activeTagInfo });
  },

  closeTagInfo() {
    this.setData({ tagDialogVisible: false, activeTagInfo: null });
  },

  stopTagDialogTap() {},

  preventTouchMove() {},

  goEvent(e) {
    wx.navigateTo({
      url: `/pages/event/event?id=${e.currentTarget.dataset.id}`,
    });
  },

  goPerson(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.id.indexOf('curr-') === 0
        ? `/curriculum-package/pages/person/person?id=${e.currentTarget.dataset.id}`
        : `/person-package/pages/person/person?id=${e.currentTarget.dataset.id}`,
    });
  },

  goBack() {
    wx.navigateBack({
      fail() {
        wx.redirectTo({ url: '/pages/index/index' });
      },
    });
  },
});
