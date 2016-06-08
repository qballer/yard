var useCases  = require('./samples');
var expect    = require("chai").expect;
var samples   = require('./samples');
var resolver  = require('../src');

describe('should support the expression ', function(){
	samples.forEach(function(element) {
		it(element.exp, function() {
			var actualResult = resolver(element.exp);
			expect(actualResult.toString()).to.equal(element.result);
		});
	});

})
