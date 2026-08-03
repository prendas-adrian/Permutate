#!/usr/bin/env sh
set -e

call(){
  :
}

javac --release 8 -cp .:lib/* -d classes src/java/PermTester.java \
    src/java/AyudaPer.java \
    src/java/HelperPermutate.java \
    src/java/Printing.java \
    src/java/Permutation.java \
    src/java/Permutate.java

echo "Building jar"
jar cf eif203.jar -C classes .
jar tf eif203.jar

#echo "copying jar"
#cp -f eif203.jar lib/eif203.jar
