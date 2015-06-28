'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es7');

var getDescriptor = Object.getOwnPropertyDescriptor;
var getOwnNames = Object.getOwnPropertyNames;
var getSymbols = Object.getOwnPropertySymbols;
var concat = Function.call.bind(Array.prototype.concat);
var reduce = Function.call.bind(Array.prototype.reduce);
var getAll = !getSymbols ? getOwnNames : function (obj) {
	return concat(getOwnNames(obj), getSymbols(obj));
};

var isES5 = ES.IsCallable(getDescriptor) && ES.IsCallable(getOwnNames);

var getDescriptorsShim = function getOwnPropertyDescriptors(value) {
	ES.RequireObjectCoercible(value);
	if (!isES5) { throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor'); }

	var O = ES.ToObject(value);
	return reduce(getAll(O), function (acc, key) {
		acc[key] = getDescriptor(O, key);
		return acc;
	}, {});
};

define(getDescriptorsShim, {
	method: getDescriptorsShim,
	shim: function shimGetOwnPropertyDescriptors() {
		if (isES5) {
			define(Object, {
				getOwnPropertyDescriptors: getDescriptorsShim
			});
			return Object.getOwnPropertyDescriptors || getDescriptorsShim;
		}
	}
});

module.exports = getDescriptorsShim;
