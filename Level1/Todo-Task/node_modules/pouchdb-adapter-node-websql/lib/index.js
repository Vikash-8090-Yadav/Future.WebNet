'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pouchdbUtils = require('pouchdb-utils');
var WebSqlPouchCore = _interopDefault(require('pouchdb-adapter-websql-core'));
var websql = _interopDefault(require('websql'));

function NodeWebSqlPouch(opts, callback) {
  var _opts = pouchdbUtils.assign({
    websql: websql // pass node-websql in as our "openDatabase" function
  }, opts);

  WebSqlPouchCore.call(this, _opts, callback);
}

// overrides for normal WebSQL behavior in the browser
NodeWebSqlPouch.valid = function () {
  return true;
};
NodeWebSqlPouch.use_prefix = false; // no prefix necessary in Node

function index (PouchDB) {
  PouchDB.adapter('websql', NodeWebSqlPouch, true);
}

module.exports = index;
