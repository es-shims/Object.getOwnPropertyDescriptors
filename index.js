'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es7');

var getDescriptor = Object.getOwnPropertyDescriptor;
var getOwnNames = Object.getOwnPropertyNames;
var getSymbols = Object.getOwnPropertySymbols;
var getAll = !getSymbols ? getOwnNames : function (obj) {
	return getOwnNames(obj).concat(getSymbols(obj));
};

var isES5 = ES.IsCallable(getDescriptor) && ES.IsCallable(getOwnNames);

var getDescriptorsShim = function getOwnPropertyDescriptors(value) {
	ES.RequireObjectCoercible(value);
	if (!isES5) { throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor'); }

	var O = ES.ToObject(value);
	return getAll(O).reduce(function (acc, key) {
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
