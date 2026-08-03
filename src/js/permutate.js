/**
 loriacarlos@gmail.com
 EIF203
 Prototypes for some permutations algorithms
 See http://www.cs.princeton.edu/~rs/talks/perms.pdf
     or references/perms_sedgewick.pdf
*/


//////////////// Algorithms /////////////////
/*
    1) Backtracking recursivo
	2) Recursivo Heap-Sedgewick
	3) Lexicografico
	4) Naive
		
*/

////////////////////////////////////////////////
/*
   1) Backtracking recursivo
*/
function recursive_backtracking(a, i, doit){
	incMargin();
	//printMargin('Enter Round i=' + i + ' ' + a);
	if (i == 0){
		doit(a);
		decMargin();
	    return;
	}
	
	for (var j = 0; j <= i; j++){
		//printMargin('Enter cycle i=' + i + ' j=' + j + ' ' + a);
		swap(a, i, j);
		recursive_backtracking(a, i - 1, doit);
		swap(a, i, j);
	}
	
	//printMargin('Leave Round i=' + i + ' ' + a);
	decMargin();
	
}

////////////////////////////////////////////////////
/*
  2) Recursivo Heap-Sedgewick
*/

function recursive_heap_sedgewick(a, i, doit){
	incMargin();
	//printMargin('Enter Round i=' + i + ' ' + a);
	if (i == 0){
	   doit(a);
	   decMargin();
	   return;
	}
	for (var j = 0; j <= i; j++){
		recursive_heap_sedgewick(a, i - 1, doit);
		//printMargin('return-and-swap: i=' + i + ' j=' + j);
		swap(a, i % 2 ? j : 0, i);
	}
	//printMargin('Leave Round i=' + i + ' ' + a);
	decMargin();
	
}
////////////////////////////////////////////////////
/*
  3) Lexicografico
*/
function next_lexicographic_permutation(a){
	var i, k;
	// Find a peak;
	for( i = a.length - 2; i > 0 && a[i] > a[i + 1]; i-- );
	if (i < 0){
		return;
	}
	// i >= 0 && a[i] < a[i + 1] > a[i + 2] > ... > a[a.length - 1]
	// Find the least k st. a[k] > a[i]
	for (k = a.length - 1; k >= 0 && a[i] > a[k]; k--);
	swap(a, i, k);
	// reverse from i+1 .. a.length - 1
	for(var l = i + 1, r = a.length - 1;  l <= r; l++, r--){
		swap(a, l, r);
	}
}
function  permutate_lexicographically(a, doit){
	for (var i = 0; i < fact(a.length); i++){
		//printMargin('Round i=' + i + ' ' + a);
		doit(a);
		next_lexicographic_permutation(a);
		
	}
	
}
////////////////////////////////////////////////////
/*
   4) Naive
*/
// Ver naive_permutate.js