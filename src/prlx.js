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
      this.init();
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

      this.items.forEach(i => {
        const height = this.getHeight(i.parent);
        const offset = i.parent.offsetTop;

        i.distanceToVisible = offset - windowHeight;
        i.height = height;
        i.offset = i.parent.offsetTop;
        i.parallaxSpace = this.getHeight(i.image) - height;
        i.scrollSpace = height + windowHeight;
      });
    }

    animate(i, scrollTop) {
      const inSight = scrollTop >= i.distanceToVisible;
      const outOfSight = scrollTop >= (i.height + i.offset);

      if (inSight && ! outOfSight) {
        let scrollAmount = scrollTop - i.distanceToVisible;

        scrollAmount = scrollAmount - (i.scrollSpace / 2);

        const animatePerPixel = i.parallaxSpace / i.scrollSpace;
        let translate = (scrollAmount * animatePerPixel).toFixed(1);

        translate = translate * -1;

        i.image.style.transform = `translateY(${translate}px`;
      }
    }

    tick() {
      requestAnimationFrame(() => {
        this.items.forEach(i => this.animate(i, window.pageYOffset));
        this.tick();
      });
    }

    init() {
      this.tick();
    }
  }

  const exp = (item, args) => new Parallax(item, args);

  if (typeof module === 'object') {
    module.exports = exp;
  } else {
    root.prlx = exp;
  }
})(this);
