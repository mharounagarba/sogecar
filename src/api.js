// src/api.js


export const getAppVersion = () =>
  window.api?.getAppVersion() ?? Promise.resolve('unknown')


