module.exports = {
	'-': {
		'precedence': 2,
		'operation': function(number1, number2){
			return number2 - number1;
		}
	},
	'+': {
		'precedence': 2,
		'operation': function(number1, number2){
			return number2 + number1;
		}
	},
	'*': {
		'precedence': 3,
		'operation': function(number1, number2){
			return number1 * number2;
		}
	},
	'/': {
		'precedence': 3,
		'operation': function(number1, number2){
			return number2 / number1;
		}
	},
	'^': {
		'precedence': 4,
		'operation': function(number1, number2){
			return Math.pow(number2, number1) ;
		}
	},
	'(': {
		'precedence': -1,
		'operation': function(number1, number2){
			throw 'doesnt have operation';
		}
	},
	')': {
		'precedence': -1,
		'operation': function(number1, number2){
			throw 'doesnt have operation';
		}
	}
};