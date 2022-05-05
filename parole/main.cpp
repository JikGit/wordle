#include <iostream>
#include "mergeSort.cpp"
#include "binarySearch.cpp" 
#include "dict.cpp"
#include <fstream>
#include <algorithm>

extern std::string dict[];
int main(){
	const int n = 7834;
	int index;

	mergeSort(dict, n);
	std::sort(std::begin(dict), std::end(dict));

	int nparola = 5;
	int inizio, fine;

	/* for (nparola = 1; nparola < 10; nparola++){ */
		/* index = binarySearch(dict, 0, n - 1, nparola); */
		/* for (int i = index; i < n; i++){ */
		/* 	if (dict[i].length() != nparola){ */
		/* 		fine = i; */
		/* 		break; */
		/* 	} */
		/* } */
		/* index = binarySearch(dict, 0, n - 1, nparola); */
		/* for (int i= index; i >= 0; i--){ */
		/* 	if (dict[i].length() != nparola){ */
		/* 		inizio = i+1; */
		/* 		break; */
		/* 	} */
		/* } */
		inizio = 0;
		fine = n-1;
		std::ofstream outdata;

		outdata.open(std::to_string(nparola)+".js"); // opens the file
		if(!outdata ) { // file couldn't be opened
			std::cerr << "error";
		}
		outdata << "function getDict" << nparola << "(){var dict" << nparola << " = [";
		for (int i = inizio; i < fine; i++)
			outdata << "\"" << dict[i] << "\", " << std::endl;
		outdata << "\"\"];";
		outdata << "return dict" << nparola << "; }";
		outdata.close();
	/* } */

}
