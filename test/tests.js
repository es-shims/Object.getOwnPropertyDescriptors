'use strict';

module.exports = function (getDescriptors, t) {
	var enumDescriptor = {
		configurable: true,
		enumerable: false,
		value: true,
		writable: false
	};
	var writableDescriptor = {
		configurable: true,
		enumerable: true,
		value: 42,
		writable: true
	};

	t.test('gets all expected non-Symbol descriptors', function (st) {
		var obj = { normal: Infinity };
		Object.defineProperty(obj, 'enumerable', enumDescriptor);
		Object.defineProperty(obj, 'writable', writableDescriptor);

		var descriptors = getDescriptors(obj);

		st.deepEqual(descriptors, {
			enumerable: enumDescriptor,
			normal: {
				configurable: true,
				enumerable: true,
				value: Infinity,
				writable: true
			},
			writable: writableDescriptor
		});
		st.end();
	});

	var supportsSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
	t.test('gets Symbol descriptors too', { skip: !supportsSymbols }, function (st) {
		var symbol = Symbol();
		var symDescriptor = {
			configurable: false,
			enumerable: true,
			value: [symbol],
			writable: true
		};
		var obj = { normal: Infinity };
		Object.defineProperty(obj, 'enumerable', enumDescriptor);
		Object.defineProperty(obj, 'writable', writableDescriptor);
		Object.defineProperty(obj, 'symbol', symDescriptor);

		var descriptors = getDescriptors(obj);

		st.deepEqual(descriptors, {
			enumerable: enumDescriptor,
			normal: {
				configurable: true,
				enumerable: true,
				value: Infinity,
				writable: true
			},
			symbol: symDescriptor,
			writable: writableDescriptor
		});
		st.end();
	});
};
