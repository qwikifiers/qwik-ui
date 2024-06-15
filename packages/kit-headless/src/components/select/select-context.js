'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.selectItemContextId = exports.groupContextId = void 0;
var qwik_1 = require('@builder.io/qwik');
var SelectContextId = (0, qwik_1.createContextId)('Select');
exports.default = SelectContextId;
exports.groupContextId = (0, qwik_1.createContextId)('Select-Group');
exports.selectItemContextId = (0, qwik_1.createContextId)('Select-Option');
