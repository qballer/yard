var expect    = require("chai").expect;
var samples   = require('./samples');
var resolver  = require('../src');

describe('should support the expression', function(){
	samples.forEach(function(element) {
		it(element.exp, function() {
			expect(resolver(element.exp)).to.equal(parseFloat(element.result));
		});
	});

})
