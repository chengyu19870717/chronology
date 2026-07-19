const content = require('../../data/content');
const { curriculumEventShare } = require('../../../utils/share');
const { handleMissingEntry, clearMissingEntryTimer } = require('../../../utils/missingEntry');
const { navigate, goHome } = require('../../../utils/nav');
const favoritesStore = require('../../../utils/favorites');

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
    const event = content.buildEvent(options.id);
    if (!event) {
      handleMissingEntry(this);
      return;
    }
    wx.setNavigationBarTitle({ title: event.name });
    this.setData({
      event,
      relatedPersons: event.relatedPersons,
      activeDispute: event.disputeTabs[0] || null,
      isFavorite: favoritesStore.isFavorite('event', event.id),
    });
    favoritesStore.recordRecent({ type: 'event', id: event.id, name: event.name });
  },

  onUnload() {
    clearMissingEntryTimer(this);
  },

  onShareAppMessage() {
    return curriculumEventShare(this.data.event);
  },

  onShareTimeline() {
    return curriculumEventShare(this.data.event);
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.id });
  },

  switchDispute(e) {
    const activeDisputeIndex = Number(e.currentTarget.dataset.index);
    this.setData({ activeDisputeIndex, activeDispute: this.data.event.disputeTabs[activeDisputeIndex] });
  },

  goPerson(e) {
    navigate(content.personRoute(e.currentTarget.dataset.id));
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

  onPageScroll(e) {
    const showBackTop = e.scrollTop > 900;
    if (showBackTop !== this.data.showBackTop) this.setData({ showBackTop });
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 220 });
  },

  goBack() {
    wx.navigateBack({ fail: () => wx.redirectTo({ url: '/pages/index/index' }) });
  },
});
