'use strict';

((root) => {
  class Parallax {
    constructor(nodes) {
      if (!this.performChecks) {
        return;
      }

      this.nodes = nodes;
    }

    performChecks() {
      if (!nodes || typeof nodes !== 'object') {
        return false;
      }

      if (/iP(ad|hone|od).*OS\s7.*/.test(navigator.userAgent)) {
        return false;
      }

      if (!window.requestAnimationFrame) {
        return false;
      }

      return true;
    }
  }

  const exp = item => new Parallax(item);

  if (typeof module === 'object') {
    module.exports = exp;
  } else {
    root.prlx = exp;
  }
})(this);
