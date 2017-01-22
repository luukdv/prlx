'use strict';

((root) => {
  class Parallax {
    constructor(item, args = {}) {
      if (!item || typeof args !== 'object' || !args.image) {
        return false;
      }

      this.items = this.getNodes(item);
      this.images = this.getNodes(args.image);

      if (!this.performChecks) {
        this.show();

        return false;
      }

      this.show();
      this.register();
    }

    getNodes(selector) {
      if (typeof selector !== 'string' || !selector.length) {
        return false;
      }

      return document.querySelectorAll(selector);
    }

    performChecks() {
      if (!this.nodes) {
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

    loopNodes(nodes, callback) {
      if (!nodes.length) {
        callback(nodes);

        return;
      }

      for (let i = 0; i < nodes.length; i++) {
        callback(nodes[i]);
      }
    }

    show() {
      function display(node) {
        node.style.display = 'block';
      }

      this.loopNodes(this.images, node => display(node));
    }

    register() {
      this.init();

      window.addEventListener('resize', () => this.init());
    }

    init() {}
  }

  const exp = (item, args) => new Parallax(item, args);

  if (typeof module === 'object') {
    module.exports = exp;
  } else {
    root.prlx = exp;
  }
})(this);
