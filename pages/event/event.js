const knowledge = require('../../data/historyKnowledge');
const { eventShare } = require('../../utils/share');
const { handleMissingEntry, clearMissingEntryTimer } = require('../../utils/missingEntry');
const { navigate, personRoute, goHome } = require('../../utils/nav');
const favoritesStore = require('../../utils/favorites');

function toPersonCard(person) {
  return {
    id: person.id,
    name: person.name,
    lifeText: person.lifeText,
    categoryText: person.categoryText,
    summary: person.summary,
    crossText: person.crossText,
    avatarPath: person.isFeaturedAvatar ? `/assets/avatars/${person.id}.jpg` : person.avatarPath,
    avatarInitial: person.avatarInitial,
    isFeaturedAvatar: person.isFeaturedAvatar,
  };
}

Page({
  data: {
    event: null,
    relatedPersons: [],
    activeTab: 'context',
    activeDisputeIndex: 0,
    activeDispute: null,
    showBackTop: false,
    isFavorite: false,
    tabs: [
      { id: 'context', name: '脉络' },
      { id: 'people', name: '人物' },
      { id: 'debate', name: '观点' },
    ],
  },

  onLoad(options) {
    const source = knowledge.eventMap[options.id];
    if (!source) {
      handleMissingEntry(this);
      return;
    }

    const decorated = knowledge.decorateEvent(source);
    const { relatedPersons: rawRelatedPersons, ...event } = decorated;
    wx.setNavigationBarTitle({ title: event.name });
    this.setData({
      event,
      relatedPersons: rawRelatedPersons.map(knowledge.decoratePerson).map(toPersonCard),
      activeDispute: event.disputeTabs[0] || null,
      isFavorite: favoritesStore.isFavorite('event', event.id),
    });
    favoritesStore.recordRecent({ type: 'event', id: event.id, name: event.name });
  },

  onUnload() {
    clearMissingEntryTimer(this);
  },

  onShareAppMessage() {
    return eventShare(this.data.event);
  },

  onShareTimeline() {
    return eventShare(this.data.event);
  },

  switchDispute(e) {
    const activeDisputeIndex = Number(e.currentTarget.dataset.index);
    this.setData({
      activeDisputeIndex,
      activeDispute: this.data.event.disputeTabs[activeDisputeIndex],
    });
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.id }, () => this.alignContentTop());
  },

  alignContentTop() {
    wx.createSelectorQuery()
      .select('.tab-row')
      .boundingClientRect()
      .selectViewport()
      .scrollOffset()
      .exec((result) => {
        if (!result[0] || !result[1]) return;
        const scrollTop = Math.max(0, result[0].top + result[1].scrollTop);
        wx.pageScrollTo({ scrollTop, duration: 220 });
      });
  },

  onPageScroll(e) {
    const showBackTop = e.scrollTop > 900;
    if (showBackTop !== this.data.showBackTop) this.setData({ showBackTop });
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 260 });
  },

  goPerson(e) {
    navigate(personRoute(e.currentTarget.dataset.id));
  },

  goHome,

  toggleFavorite() {
    const event = this.data.event;
    if (!event) return;
    this.setData({
      isFavorite: favoritesStore.toggleFavorite({
        type: 'event',
        id: event.id,
        name: event.name,
      }),
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
