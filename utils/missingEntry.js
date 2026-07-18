const HOME_URL = '/pages/index/index';

function handleMissingEntry(page) {
  wx.showToast({
    title: '未找到该条目',
    icon: 'none',
  });
  page.missingEntryTimer = setTimeout(() => {
    wx.navigateBack({
      delta: 1,
      fail() {
        wx.redirectTo({ url: HOME_URL });
      },
    });
  }, 1200);
}

function clearMissingEntryTimer(page) {
  if (!page.missingEntryTimer) return;
  clearTimeout(page.missingEntryTimer);
  page.missingEntryTimer = null;
}

module.exports = {
  handleMissingEntry,
  clearMissingEntryTimer,
};
