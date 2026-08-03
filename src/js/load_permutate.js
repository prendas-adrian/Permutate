/*
  loricarlos@gmail.com
*/
// Global Imports
var System = Java.type('java.lang.System');
var String = Java.type('java.lang.String');
var format = String.format;
var write  = function(s){System.out.print(s);}
var writeln = function(s){System.out.println(s);}

// Global methods
var cTM = System.currentTimeMillis;

// Java classes for verification
load('src/js/java_permutate.js');

// JS functions for helping demo of algorithms
load('src/js/util/printing.js');
load('src/js/helper_permutate.js');

// Swap based algorithms
load('src/js/permutate.js');

// All naively generated
load('src/js/naive_permutate.js');

// Tester of all
load('src/js/test_permutate.js');

if(!pipe)
  print('\n*** load_permutate done OK ***\n');