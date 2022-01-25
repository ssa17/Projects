// one line solution
// function fib(n) {
// 	return Math.round((Math.pow(1.618034, n) - Math.pow(1 - 1.618034, n)) / Math.sqrt(5));
// }

//detailed solution
function fib(n) {
	//golden ratio number
	const phi = 1.618033988749;

	//golden ratio to the power of the nth element to find the n+1 element position
	let n1 = Math.pow(phi, n);

	//1 - golden ratio to the power of the nth element find the n-1 element position
	let n2 = Math.pow(1 - phi, n);

	//square root of 5
	const sqrt = Math.sqrt(5);

	//n+1 element position - n-1 element position and then divided by square root of 5 gives the nth element
	return Math.round((n1 - n2) / sqrt);
}
