'use strict';

((root) => {
  class Parallax {
    constructor(item, args = {}) {
      if (!item || typeof args !== 'object' || !args.image) {
        return false;
      }

      this._image = args.image;
      this._items = this._getNodes(item);

      if (!this._performChecks()) {
        this._show();

        return false;
      }

      this._show();
      this._register();
      this._init();
    }

    _checkSelector(selector) {
      return (typeof selector === 'string' && selector.length);
    }

    _getNodes(selector) {
      if (!this._checkSelector(selector) || !this._checkSelector(args.image)) {
        return false;
      }

      const nodes = document.querySelectorAll(selector);

      if (!nodes.length) {
        return false;
      }

      const items = [];

      this._loopNodes(nodes, node => {
        items.push({parent: node});
      });

      this._loop(items, item => {
        item.image = item.parent.querySelector(this._image);
      });

      return items;
    }

    _performChecks() {
      if (!this._items) {
        return false;
      }

      // DOM painting is paused during scroll events on iOS7
      if (/iP(ad|hone|od).*OS\s7.*/.test(navigator.userAgent)) {
        return false;
      }

      if (!requestAnimationFrame) {
        return false;
      }

      return true;
    }

    _loop(items, callback) {
      for (let i = 0; i < items.length; i++) {
        callback(items[i]);
      }
    }

    _loopNodes(nodes, callback) {
      // Check if it's a single node
      if (!nodes.length) {
        callback(nodes);

        return;
      }

      this._loop(nodes, callback);
    }

    _show() {
      function display(node) {
        node.style.display = 'block';
      }

      this._loop(this._items, item => display(item.image));
    }

    _register() {
      this._calculate();

      window.addEventListener('resize', () => this._calculate());
    }

    _getHeight(node) {
      return node.getBoundingClientRect().height;
    }

    _calculate() {
      const windowHeight = window.innerHeight;

      this._items.forEach(i => {
        if (!i.image) {
          return;
        }

        const height = this._getHeight(i.parent);
        const offset = i.parent.offsetTop;

        i.distanceToVisible = offset - windowHeight;
        i.height = height;
        i.offset = i.parent.offsetTop;
        i.parallaxSpace = this._getHeight(i.image) - height;
        i.scrollSpace = height + windowHeight;
      });
    }

    _animate(i, scrollTop) {
      const inSight = scrollTop >= i.distanceToVisible;
      const outOfSight = scrollTop >= (i.height + i.offset);

      if (!inSight || outOfSight) {
        return;
      }

      const visible = scrollTop - i.distanceToVisible;
      const amount = visible - (i.scrollSpace / 2); // Center at middle of viewport
      const animatePerPixel = i.parallaxSpace / i.scrollSpace;
      let translate = (amount * animatePerPixel).toFixed(1);

      i.image.style.transform = `translateY(${translate * -1}px`;
    }

    _tick() {
      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset;

        this._items.forEach(i => this._animate(i, scrollTop));
        this._tick();
      });
    }

    _init() {
      this._tick();
    }

    // Public API
    recalculate() {
      this._calculate();
    }
  }

  const exp = (item, args) => new Parallax(item, args);

  if (typeof module === 'object') {
    module.exports = exp;
  } else {
    root.prlx = exp;
  }
})(this);
