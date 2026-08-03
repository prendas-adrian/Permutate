function help(){
	print("arguments: string [-v] [-p] [-m] [--help]\n");
	print("opciones:");
	print("string \t string a permutar default=ABCDEF");
	print("-v \t verbose specifica true, sin este param default=false\n");
	print("-p \t especifica si se debe imprimir en pipe, default=false\n");
	print("-m \t especifica el algoritmo para las permutaciones");
	print("   \t [backtrack,heap_sedgewick,lexicographic,naive] defaul=all");
	print("\nNota: \t nPn = n! permutaciones");
	print("  \t nPr = n!/(n-r)! /*formula*/ \n\n");
}

var args = Array.prototype.slice.call(arguments);

if (args.length == 0){
	help();
}

var pipe = false;
var verboseFlag = false;
var string = "ABCDEF";
var selectedMethod = 'all';

var should_exit = false;
for (var i = 0; i < args.length; i++) {
	var arg = args[i];
	if (arg === '-v') {
		verboseFlag = true;
	} else if (arg === '-p') {
		pipe = true;
	} else if (arg === '-m') {
		if (i + 1 < args.length) {
			selectedMethod = args[i + 1];
			i++;
		}
	} else if (arg === '--help') {
		help();
		should_exit = true;
		break;
	} else if (i === 0 || (string === "ABCDEF" && i === 1)) {
		string = arg;
	}
}

if (should_exit) {
	quit();
}

load('src/js/load_permutate.js');
verbose = verboseFlag;

//print("pipe=" + pipe + " string=" + string + " verbose=" + verbose + " method=" + selectedMethod);


function recursive_backtracking_func(string){
	recursive_backtracking(string.split(""), string.length - 1, showPermutation);
}
function recursive_heap_sedgewick_func(string){
	recursive_heap_sedgewick(string.split(""), string.length - 1, showPermutation);
}
function permutate_lexicographically_func(string){
	permutate_lexicographically(string.split(""), showPermutation);
}
function permutate_naive_func(string){
	var perms = permutate_naively(string);
	for (var i = 0; i < perms.length; i++){
		showPermutation(perms[i]);
    }
}

function test_permutate(string, algorithmName, algorithm){
	if(!pipe){	
		print('\n*** Testing ' + algorithmName + ' ***');
	}
	reset();
	method = algorithmName;
	permTester = new PermTester(algorithmName, string);
	var before = cTM();
	algorithm(string);
	var after = cTM();
	if(!pipe)
		print('\n*** Count of ' + algorithmName + ' operations = ' + insertions + " (" + (after - before) + " ms)");
	permTester.ensureComplete();
	
}

function main(string, selectedMethod){
	if(!pipe){
		print("*** Testing Permutation with: " + string + " ***");
	}
	switch (selectedMethod){
		case "all":
			test_permutate(string, BACKTRACKING, recursive_backtracking_func);
			test_permutate(string, HEAP_SEDGEWICK, recursive_heap_sedgewick_func);
			test_permutate(string, LEXIC, permutate_lexicographically_func);
			test_permutate(string, NAIVE, permutate_naive_func);
			break;
		case 'backtrack':
			test_permutate(string, BACKTRACKING, recursive_backtracking_func);
			break;
		case 'heap_sedgewick':
			test_permutate(string, HEAP_SEDGEWICK, recursive_heap_sedgewick_func);
			break;
		case 'lexicographic':
			test_permutate(string, LEXIC, permutate_lexicographically_func);
			break;
		case 'naive':
			test_permutate(string, NAIVE, permutate_naive_func);
			break;
		default:
			print("Error: unknown method " + selectedMethod);
			help();
			return;	
	}
}

main(string, selectedMethod);

if(!pipe)
		print('\n *** Finished ***')