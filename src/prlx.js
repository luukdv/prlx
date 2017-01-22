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

    loop(callback) {
      for (let i = 0; i < this.nodes.length; i++) {
        callback(this.nodes[i]);
      }
    }

    show() {
      function display(node) {
        node.style.display = 'block';
      }

      if (!this.nodes.length) {
        display(this.nodes);

        return;
      }

      this.loop(node => {
        display(node);
      });
    }

    register() {
      this.init();

      window.addEventListener('resize', () => this.init());
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
