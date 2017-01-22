'use strict';

((root) => {
  class Parallax {
    constructor(nodes) {
      this.nodes = nodes;
    }
  }

  const exp = item => new Parallax(item);

  if (typeof module === 'object') {
    module.exports = exp;
  } else {
    root.prlx = exp;
  }
})(this);
