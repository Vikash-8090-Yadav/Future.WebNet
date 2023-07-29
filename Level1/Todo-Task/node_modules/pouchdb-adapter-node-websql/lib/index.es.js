import { assign } from 'pouchdb-utils';
import WebSqlPouchCore from 'pouchdb-adapter-websql-core';
import websql from 'websql';

function NodeWebSqlPouch(opts, callback) {
  var _opts = assign({
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

export default index;
