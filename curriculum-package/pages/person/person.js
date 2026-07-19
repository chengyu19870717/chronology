const content = require('../../data/content');
const { getPersonTagInfo } = require('../../../data/personTagGlossary');
const { personShare } = require('../../../utils/share');
const { handleMissingEntry, clearMissingEntryTimer } = require('../../../utils/missingEntry');
const { navigate, goHome } = require('../../../utils/nav');
const favoritesStore = require('../../../utils/favorites');

Page({
  data: {
    person: null,
    resume: [],
    relatedEvents: [],
    relationships: [],
    activeTab: 'resume',
    activeDisputeIndex: 0,
    activeDispute: null,
    showBackTop: false,
    avatarLoadFailed: false,
    tagDialogVisible: false,
    activeTagInfo: null,
    isFavorite: false,
    tabs: [
      { id: 'profile', name: '档案' },
      { id: 'resume', name: '履历' },
      { id: 'relations', name: '关系' },
      { id: 'events', name: '事件' },
      { id: 'debate', name: '争议' },
    ],
  },

  onLoad(options) {
    const person = content.buildPerson(options.id);
    if (!person) {
      handleMissingEntry(this);
      return;
    }
    wx.setNavigationBarTitle({ title: person.name });
    this.setData({
      person,
      resume: person.resume,
      relatedEvents: person.relatedEvents,
      relationships: content.getPersonRelationships(person.id),
      activeDispute: person.disputeTabs[0] || null,
      avatarLoadFailed: false,
      isFavorite: favoritesStore.isFavorite('person', person.id),
    });
    favoritesStore.recordRecent({ type: 'person', id: person.id, name: person.name });
  },

  onUnload() {
    clearMissingEntryTimer(this);
  },

  onShareAppMessage() {
    return personShare(this.data.person, '/curriculum-package/pages/person/person');
  },

  onShareTimeline() {
    return personShare(this.data.person, '/curriculum-package/pages/person/person');
  },

  switchTab(e) {
    const activeTab = e.currentTarget.dataset.tabId;
    if (!this.data.tabs.some(tab => tab.id === activeTab) || activeTab === this.data.activeTab) return;
    this.setData({ activeTab });
  },

  switchDispute(e) {
    const activeDisputeIndex = Number(e.currentTarget.dataset.index);
    this.setData({
      activeDisputeIndex,
      activeDispute: this.data.person.disputeTabs[activeDisputeIndex],
    });
  },

  goPerson(e) {
    navigate(content.personRoute(e.currentTarget.dataset.id));
  },

  goEvent(e) {
    navigate(content.eventRoute(e.currentTarget.dataset.id));
  },

  goHome,

  toggleFavorite() {
    const person = this.data.person;
    if (!person) return;
    this.setData({
      isFavorite: favoritesStore.toggleFavorite({
        type: 'person',
        id: person.id,
        name: person.name,
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

  goBack() {
    wx.navigateBack({ fail: () => wx.redirectTo({ url: '/pages/index/index' }) });
  },
});
