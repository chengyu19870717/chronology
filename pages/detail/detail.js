const { timeline } = require('../../data/chronology');

const STORAGE_KEY = 'chronology_favorites_v1';

Page({
  data: {
    record: null,
    isFavorite: false,
    typeLabel: '',
  },

  onLoad(options) {
    const record = timeline.find(item => item.id === options.id);
    if (!record) return;

    wx.setNavigationBarTitle({ title: record.name });
    this.setData({
      record,
      typeLabel: record.type === 'dynasty' ? '朝代政权' : '关键事件',
    });
    this.syncFavorite(record.id);
  },

  onShow() {
    if (this.data.record) {
      this.syncFavorite(this.data.record.id);
    }
  },

  syncFavorite(id) {
    const favorites = wx.getStorageSync(STORAGE_KEY) || [];
    this.setData({
      isFavorite: favorites.indexOf(id) !== -1,
    });
  },

  toggleFavorite() {
    const record = this.data.record;
    if (!record) return;

    const favorites = wx.getStorageSync(STORAGE_KEY) || [];
    const index = favorites.indexOf(record.id);
    let title = '已收藏';

    if (index >= 0) {
      favorites.splice(index, 1);
      title = '已取消';
    } else {
      favorites.push(record.id);
    }

    wx.setStorageSync(STORAGE_KEY, favorites);
    this.setData({ isFavorite: index < 0 });
    wx.showToast({ title, icon: 'none', duration: 900 });
  },

  copySummary() {
    const record = this.data.record;
    if (!record) return;

    const text = `${record.name}（${record.dateText}）：${record.summary}`;
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({ title: '已复制', icon: 'success' });
      },
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
