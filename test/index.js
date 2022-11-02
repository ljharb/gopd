'use strict';

var test = require('tape');
var gOPD = require('../');

test('gOPD', function (t) {
	t.test('supported', { skip: !gOPD }, function (st) {
		st.equal(typeof gOPD, 'function', 'is a function');

		var obj = {};
		st.notOk('x' in obj, 'property does not exist');

		gOPD(obj, 'x', { configurable: true, enumerable: false });

		st.ok('x' in obj, 'property now exists');
		st.notOk(
			Object.prototype.propertyIsEnumerable.call(obj, 'x'),
			'property is not enumerable'
		);
		st['throws'](
			function () { obj.x = 3; },
			TypeError,
			'nonwritable property can’t be written'
		);

		delete obj.x;
		st.notOk('x' in obj, 'property no longer exists');

		st.end();
	});

	t.test('not supported', { skip: gOPD }, function (st) {
		st.equal(gOPD, void undefined, 'is undefined');

		st.end();
	});

	t.end();
});
