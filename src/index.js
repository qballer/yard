var _ = require('lodash');
var operators = require('./operators');

function isTokenOperator(char) {
	return !!operators[char];
}
// input: mathimatical expression infix order
// outputs: array of tokens in infix order
function tokenize(expression) {
	var firstPass = ''
	_(expression).forEach(function (char, index) {
		firstPass += char;

		//insert spaces between 1+ and +1 will result in 1 + and + 1
		if(expression.length - 1 > index &&
			(isTokenOperator(expression[index + 1]) && !isNaN(char) ||
				isTokenOperator(char) && !isNaN(expression[index + 1]))) {

			firstPass += ' ';
		}

	})
	// return an array of token by spliting on each space and removing the spaces.
	return firstPass.split(/(\s+)/)
		  .filter(function(value) { return !value.match(/(\s+)/); });
}

// input: mathimatical expression infix order
// outputs: array of tokens in postfix order
function parse(expression) {
	var tokens = tokenize(expression);

	var output = [];
	var stack = [];

	tokens.forEach(function(token){
		//if its a nunber we should just output it.
		if(!isNaN(token)) {
			output.push(token)
		}
		else if(isTokenOperator(token)) {
			//opening brace can always be pushed.
			// empty stack as well.
			if (stack.length === 0 || token === '(') {
				stack.push(token);
			}
			// unwine the stack till opening brace and get rid of it.
			else if(token === ')'){
				while(stack.length > 0 && stack[stack.length - 1] !== '(') {
					output.push(stack.pop());
				}
				if (stack.length > 0 && stack[stack.length -1] === '('){
					//remove opening brace
					stack.pop();
				}
				else {
					throw 'excpecting opening brace';
				}
			}
			//place operator on stack
			else {
				// if stack head is higher presedence unwine the stack till prescence makes sense
				while(stack.length > 0 && operators[stack[stack.length - 1]].precedence >= operators[token].precedence) {
					output.push(stack.pop());
				}
				stack.push(token);
			}
		}
	});

	// if something is left on the stack lets just dump it to the output.
	while(stack.length > 0){
		output.push(stack.pop());
	}
	return output;
}

function doOperation(number1, number2, token) {
	return operators[token] ? operators[token].operation(number1, number2) : NaN;
}

//input:  mathimatical expression.
//output: evaluation.

function resolve(expression) {
	var postfix = parse(expression);
	var stack = [];
	postfix.forEach(function(token){
		if(!isNaN(token)) {
			stack.push(token);
		} else if(isTokenOperator(token)) {
			var number1 = parseFloat(stack.pop());
			var number2 = parseFloat(stack.pop());
			stack.push(doOperation(number1, number2, token));
		} else {
			throw 'unknown opertator exception ';
		}
	});
	return stack.pop();
}
module.exports = resolve;