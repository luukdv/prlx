'use strict';

((root) => {
  class Parallax {
    constructor(item, args = {}) {
      if (!item || typeof args !== 'object' || !args.image) {
        return false;
      }

      this.image = args.image;
      this.items = this.getNodes(item);

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

      const nodes = document.querySelectorAll(selector);

      if (!nodes.length) {
        return false;
      }

      const items = [];

      this.loopNodes(nodes, node => {
        items.push({parent: node});
      });

      this.loop(items, item => {
        const image = item.parent.querySelector(this.image);

        if (!image) {
          return false;
        }

        item.image = image;
      });

      return items;
    }

    performChecks() {
      if (!this.items) {
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

    loop(items, callback) {
      for (let i = 0; i < items.length; i++) {
        callback(items[i]);
      }
    }

    loopNodes(nodes, callback) {
      if (!nodes.length) {
        callback(nodes);

        return;
      }

      this.loop(nodes, callback);
    }

    show() {
      function display(node) {
        node.style.display = 'block';
      }

      this.loop(this.items, item => display(item.image));
    }

    register() {
      this.calculate();

      window.addEventListener('resize', () => this.calculate());
    }

    getHeight(node) {
      return Math.floor(node.getBoundingClientRect().height);
    }

    calculate() {
      const windowHeight = window.innerHeight;

      this.items.forEach(item => {
        const height = this.getHeight(item.parent);
        const offset = item.parent.offsetTop;

        item.distanceToVisible = offset - windowHeight;
        item.height = height;
        item.offset = item.parent.offsetTop;
        item.parallaxSpace = this.getHeight(item.image) - height;
        item.scrollSpace = height + windowHeight;
      });
    }
  }

  const exp = (item, args) => new Parallax(item, args);

  if (typeof module === 'object') {
    module.exports = exp;
  } else {
    root.prlx = exp;
  }
})(this);
