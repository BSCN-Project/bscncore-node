'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export bscncore-lib', function() {
    var bscncore = require('../');
    should.exist(bscncore.lib);
    should.exist(bscncore.lib.Transaction);
    should.exist(bscncore.lib.Block);
  });
});
