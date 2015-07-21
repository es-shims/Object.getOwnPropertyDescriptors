'use strict';

module.exports = function (getDescriptors, t) {
	var enumDescriptor = {
		enumerable: false,
		writable: false,
		configurable: true,
		value: true
	};
	var writableDescriptor = {
		enumerable: true,
		writable: true,
		configurable: true,
		value: 42
	};

	t.test('gets all expected non-Symbol descriptors', function (st) {
		var obj = { normal: Infinity };
		Object.defineProperty(obj, 'enumerable', enumDescriptor);
		Object.defineProperty(obj, 'writable', writableDescriptor);

		var descriptors = getDescriptors(obj);

		st.deepEqual(descriptors, {
			normal: {
				enumerable: true,
				writable: true,
				configurable: true,
				value: Infinity
			},
			enumerable: enumDescriptor,
			writable: writableDescriptor
		});
		st.end();
	});

	var supportsSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
	t.test('gets Symbol descriptors too', { skip: !supportsSymbols }, function (st) {
		var symbol = Symbol();
		var symDescriptor = {
			enumerable: true,
			writable: true,
			configurable: false,
			value: [symbol]
		};
		var obj = { normal: Infinity };
		Object.defineProperty(obj, 'enumerable', enumDescriptor);
		Object.defineProperty(obj, 'writable', writableDescriptor);
		Object.defineProperty(obj, 'symbol', symDescriptor);

		var descriptors = getDescriptors(obj);

		st.deepEqual(descriptors, {
			normal: {
				enumerable: true,
				writable: true,
				configurable: true,
				value: Infinity
			},
			enumerable: enumDescriptor,
			writable: writableDescriptor,
			symbol: symDescriptor
		});
		st.end();
	});
};
