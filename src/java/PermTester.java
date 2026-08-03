package eif203.labs.permutate;
import java.util.*;
import eif203.util.*;

/*
 loriacarlos@gmail.com
*/
public class PermTester extends Hashtable<String, Permutation> {
	protected int n;
	protected int max_size;
	final String method;
	final protected String[] OBJECTS = {"A", "B", "C", "D", "E",
	                                    "F", "G", "H", "I", "J",
										"K", "L", "M", "N", "O",
										"P", "Q", "R", "S", "T"
	};
	final Permutation seed;
	final String source;
	
	public PermTester(String method, String arr){
		this.method = method;
		this.n = arr.length();
		String[] a = arr.split("");

		int f = factorial(n);;

		int repeated = repeatedLetters(arr);
		if(repeated==0){
			this.max_size = f;
		}else{
			int rf = factorial(repeated);
			//System.out.println("f: "+f +" repeated: " + repeated + " rf: " + rf);
			this.max_size = f  / rf;
		}
		// Set seed and source
		//System.out.println("max size: " + this.max_size);
		this.seed = new Permutation(method, a);
		this.source = this.seed.source();
	}

	public int factorial(int n){
		int f = 1;
		for(int i = 1; i <= n; f *= i, i++);
		return f;
	}

	public int repeatedLetters(String word){
		String[] array = word.split("");

        Map<String, Integer> counts = new HashMap<>();

        for (String s : array) {
            counts.put(s, counts.getOrDefault(s, 0) + 1);
        }
		int sum = counts.values()
						.stream()
						.filter(v->v!=1)
						.mapToInt(Integer::intValue)
						.sum();
		return sum;
	}
	 
	public void add(Permutation p){
		if ( !this.source.equals(p.source())){
			throw new RuntimeException("Invalid source: " + p + " != " + this.source);
		}
		if (size() + 1 > this.max_size){
			throw new RuntimeException("Size beeing exceeded: " + (size() + 1) + " > " + this.max_size);
		}
		String key = p.toString();
		if ( get(key) != null){
			throw new RuntimeException("Duplicated key: " + key);
		}
		if (p.size() != this.n){
			throw new RuntimeException("Invalid size: " + p.size() + " != " + this.n);
		}
		super.put(key, p);
	}
	
	public void ensureComplete(){
		if (size() != this.max_size ) {
			throw new RuntimeException("Incomplete.: " + this.max_size + " != " + this.size());
		}
		
	}
	
	public void toCSV(String filename) throws Exception {///n y swaps para el csv, heap el mejor
		filename = "data/csvJava/"+"n_"+this.n+"m_"+filename+"_java.csv";
		ensureComplete();
		StringBuffer b = new StringBuffer();
		// Headers
		b.append("Method,");
		for(int i = 0; i < this.n - 1; i++)
			b.append("p[" + i + "],");
		b.append("p[" + (this.n - 1) + "],");
		b.append("Cost(ms)\n");
		// Permutations
		for(String key : keySet()){
			Permutation p = get(key);
			b.append(p.getMethod() + ",");
			String[] value = p.getValue();
			for(int i = 0; i < value.length; i++){
			   b.append(value[i] + ",");
			}
			b.append(p.getCost() + "\n");
		}
		IOServices.writeText("", filename, b.toString());
	}
	
}