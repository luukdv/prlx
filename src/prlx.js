'use strict';

((root) => {
  const prlx = (item, image) => {
    if (!item || !image) {
      return false;
    }

    const items = getNodes(item);
    const transformType = 'webkitTransform' in document.body.style ? 'webkitTransform' : 'transform';

    if (items) {
      show();
    } else {
      return false;
    }

    if (performChecks()) {
      register();
      init();
    }

    function getNodes(selector) {
      const nodes = document.querySelectorAll(selector);

      if (!nodes.length) {
        return false;
      }

      const items = [];

      loopNodes(nodes, node => {
        items.push({parent: node});
      });

      loop(items, item => {
        item.image = item.parent.querySelector(image);
      });

      return items;
    }

    function performChecks() {
      if (typeof requestAnimationFrame !== 'function') {
        return false;
      }

      // DOM painting is paused during scroll events on iOS7
      if (/iP(ad|hone|od).*OS\s7.*/.test(navigator.userAgent)) {
        return false;
      }

      return true;
    }

    function loop(items, callback) {
      for (let i = 0; i < items.length; i++) {
        callback(items[i]);
      }
    }

    function loopNodes(nodes, callback) {
      // Check if it's a single node
      if (!nodes.length) {
        callback(nodes);

        return;
      }

      loop(nodes, callback);
    }

    function show() {
      function display(node) {
        node.style.display = 'block';
      }

      loop(items, item => {
        if (item.image) {
          display(item.image);
        }
      });
    }

    function register() {
      calculate();

      window.addEventListener('resize', () => calculate());
    }

    function getHeight(node) {
      return node.getBoundingClientRect().height;
    }

    function calculate() {
      const windowHeight = window.innerHeight;

      items.forEach(i => {
        if (!i.image) {
          return;
        }

        const height = getHeight(i.parent);
        const offset = i.parent.offsetTop;

        i.distanceToVisible = offset - windowHeight;
        i.height = height;
        i.offset = i.parent.offsetTop;
        i.parallaxSpace = getHeight(i.image) - height;
        i.scrollSpace = height + windowHeight;
      });
    }

    function animate(i, scrollTop) {
      const inSight = scrollTop >= i.distanceToVisible;
      const outOfSight = scrollTop >= (i.height + i.offset);

      if (!inSight || outOfSight) {
        return;
      }

      const visible = scrollTop - i.distanceToVisible;
      const amount = visible - (i.scrollSpace / 2); // Center at middle of viewport
      const animatePerPixel = i.parallaxSpace / i.scrollSpace;
      let translate = parseFloat((amount * animatePerPixel).toFixed(1));

      i.image.style[transformType] = `translateY(${translate * -1}px)`;
    }

    function tick() {
      requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset;

        items.forEach(i => animate(i, scrollTop));
        tick();
      });
    }

    function init() {
      tick();
    }

    return {
      recalculate() {
        calculate();
      }
    }
  }

  if (typeof module === 'object') {
    module.exports = prlx;
  } else {
    root.prlx = prlx;
  }
})(this);
