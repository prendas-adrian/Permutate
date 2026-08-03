/**
  loriacarlos@gmail.com EIF203
*/
// Helper variables and helper functions
var swaps = 0;            // counts swaps
var permutation = 0;      // counts permutations
var insertions = 0;       // counts insertions
var permTester;           // verifies correctness
var method = "";          // indicates the algroithms currently used

// if not indicated algorithms uses this number for generation
var DEFAULT_PERMUT_SIZE = 8;

// Algorithm names (method)
var BACKTRACKING   = 'backtrack';
var HEAP_SEDGEWICK = 'heap_sedgewick';
var LEXIC          = 'lexicographic';
var NAIVE          = 'naive';

// Array of letters used to permutate (max = 20)
var baseArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
				 'Q', 'R', 'S', 'T'
                ];
/*
 Simple exchange function with counter (reset every time a function is tested)
*/
function swap(a, i, j){
	if ( i == j) 
		return;
	swaps += 4;
	var t = a[i];
	a[i] = a[j];
	a[j] = t;
}
/*
  inserts x a every position i in p with counting
*/
function insertAt(p, i, x){
	
	var res = [];
	for(var k = 0; k < i; k++){
		insertions++;
		res.push(p[k]);
	}
	insertions++;
	res.push(x);
	for(var k = i; k < p.length; k++){
		insertions++;
		res.push(p[k]);
	}
	return res;
}

function fact(n){
	var f = 1;
	for (var i = 1; i <=n; f *= i, i++);
	return f;
}

function genArray(n){
	n = n || DEFAULT_PERMUT_SIZE;
	n = n % baseArray.length;
	return baseArray.slice(0, n);
}


function showPermutation(a){
	try{
		if (permTester)
			permTester.add(new Permutation(method, a));
			if(pipe)
				printPlain(a.join(""));
			else
				printPlain(format("%3.0f) %s", ++permutation, a.toString()));
	}catch(e){
		//printPlain("Error: " + e);
	}	
	
}


function reset(method, n){
	resetMargin();
	permutation = 0;
	swaps = 0;
	insertions = 0;
	method = "";
	permTester = null;
	
}