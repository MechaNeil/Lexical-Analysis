// function definition (create the function)

// Define token types as constants
const TokenTypes = {
	NUMBER: 'NUMBER',
	PLUS: 'PLUS',
	MINUS: 'MINUS',
	MULTIPLY: 'MULTIPLY',
	DIVIDE: 'DIVIDE',
	LEFT_PAREN: 'LEFT_PAREN',
	RIGHT_PAREN: 'RIGHT_PAREN',
};

// Helper function to check if a character is a digit or a decimal point.
function isDigit(ch) {
	return /[0-9]/.test(ch) || ch === '.';
}

// Helper function to check if a character is whitespace.
function isWhitespace(ch) {
	return /\s/.test(ch);
}

// The lexicalAnalyzer function that processes an arithmetic expression.
function lexicalAnalyzer(input) {
	const tokens = [];
	let i = 0;

	while (i < input.length) {
		const ch = input[i];

		// Skip any whitespace characters.
		if (isWhitespace(ch)) {
			i++;
			continue;
		}

		// Process single-character tokens for operators and parentheses.
		if (ch === '+') {
			tokens.push({ type: TokenTypes.PLUS, value: ch });
			i++;
			continue;
		}
		if (ch === '-') {
			tokens.push({ type: TokenTypes.MINUS, value: ch });
			i++;
			continue;
		}
		if (ch === '*') {
			tokens.push({ type: TokenTypes.MULTIPLY, value: ch });
			i++;
			continue;
		}
		if (ch === '/') {
			tokens.push({ type: TokenTypes.DIVIDE, value: ch });
			i++;
			continue;
		}
		if (ch === '(') {
			tokens.push({ type: TokenTypes.LEFT_PAREN, value: ch });
			i++;
			continue;
		}
		if (ch === ')') {
			tokens.push({ type: TokenTypes.RIGHT_PAREN, value: ch });
			i++;
			continue;
		}

		// Process numbers (both integers and decimals)
		if (isDigit(ch)) {
			let numStr = '';
			let dotEncountered = false;

			// Accumulate all consecutive digits (and at most one dot)
			while (i < input.length && isDigit(input[i])) {
				if (input[i] === '.') {
					if (dotEncountered) {
						throw new Error('Invalid number format: multiple decimal points');
					}
					dotEncountered = true;
				}
				numStr += input[i];
				i++;
			}
			tokens.push({ type: TokenTypes.NUMBER, value: numStr });
			continue;
		}

		// If character doesn't match any token, throw an error.
		throw new Error(`Unrecognized character: ${ch}`);
	}

	return tokens;
}

let testCounter = 1;

function displayTokens(tokens) {
	console.log(`\nTest no. ${testCounter}`);
	testCounter++;
	console.log('------------------------------------------------------------');
	console.log('\tType\t\t\t\tValue');
	console.log('------------------------------------------------------------');
	tokens.forEach((token) => {
		console.log(`\t${token.type.padEnd(16, ' ')}\t${token.value}`);
	});
	console.log('------------------------------------------------------------');
}

// Test cases:
console.log('---------------------- LEXICAL ANALYZER --------------------');

displayTokens(lexicalAnalyzer('2 + 3 * (4 - 1)'));
// Expected output: Array of token objects corresponding to numbers, plus, multiply, left/right parentheses, etc.

displayTokens(lexicalAnalyzer('10.5 / 2'));
// Expected output: Tokens representing the number 10.5, division operator, and the number 2.

displayTokens(lexicalAnalyzer('1 + 2 + 3'));
// Expected output: Tokens representing three numbers separated by plus operators.
