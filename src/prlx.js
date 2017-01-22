'use strict';

((root) => {
  class Parallax {
    constructor(nodes) {
      if (!nodes || typeof nodes !== 'object') {
        return;
      }

      this.nodes = nodes;

      if (!this.performChecks) {
        this.show();

        return;
      }

      this.show();
      this.register();
    }

    performChecks() {
      if (/iP(ad|hone|od).*OS\s7.*/.test(navigator.userAgent)) {
        return false;
      }

      if (!window.requestAnimationFrame) {
        return false;
      }

      return true;
    }

    show() {
      function display(node) {
        node.style.display = 'block';
      }

      if (!this.nodes.length) {
        display(this.nodes);

        return;
      }

      for (let i = 0; i < this.nodes.length; i++) {
        display(this.nodes[i]);
      }
    }

    register() {
      this.init();

      window.addEventListener('resize', () => {
        this.init();
      });
    }

    init() {}
  }

  const exp = item => new Parallax(item);

  if (typeof module === 'object') {
    module.exports = exp;
  } else {
    root.prlx = exp;
  }
})(this);
