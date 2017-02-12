'use strict';

import path from 'path';
import phantom from 'phantom';
import test from 'ava';

const script = path.normalize(__dirname + '/../dist/prlx.js');

function evaluate(cb) {
 return new Promise(resolve => {
    phantom.create()
      .then(ph => ph.createPage())
      .then(page => page.injectJs(script)
        .then(() => page)
        .then(page => resolve(page.evaluate(cb)))
      );
  });
}

test('Function should be available', t => {
  return evaluate(function() {
    return typeof window.prlx;
  }).then(r => {
    t.is(r, 'function');
  });
});
