function navigate(url) {
  const shouldRedirect = getCurrentPages().length >= 9;
  const method = shouldRedirect ? 'redirectTo' : 'navigateTo';
  wx[method]({
    url,
    fail() {
      if (!shouldRedirect) wx.redirectTo({ url });
    },
  });
}

function personRoute(id) {
  return id.indexOf('curr-') === 0
    ? `/curriculum-package/pages/person/person?id=${id}`
    : `/person-package/pages/person/person?id=${id}`;
}

function eventRoute(id) {
  return id.indexOf('curr-event-') === 0
    ? `/curriculum-package/pages/event/event?id=${id}`
    : `/pages/event/event?id=${id}`;
}

function goHome() {
  wx.reLaunch({ url: '/pages/index/index' });
}

module.exports = {
  navigate,
  personRoute,
  eventRoute,
  goHome,
};
