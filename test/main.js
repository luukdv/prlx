'use strict';

import * as phantom from 'phantom';
import test from 'ava';

const page = new Promise(resolve => {
  phantom.create()
    .then(p => p.createPage())
    .then(p => {
      resolve(p.evaluate(function() {
        return this;
      }));
    });
});
