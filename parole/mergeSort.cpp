#include <iostream>
#include <time.h>

void mergeSort(std::string [], int );
void copyArray(std::string[], std::string[], int , int start1 = 0, int end1 = 0, int start2 = 0, int end2 = 0);
void merge(std::string [], std::string[], int, int, std::string[]);

void mergeSort(std::string arr[], int n){
	//se la grandezza dell'array e' uguale a 1 vuoldire che non si puo' piu' dividere in 2 quindi finisco questa funzione
	if (n == 1)
		return;

	//creo due array, uno sara' la prima meta' dell'array e l'altro sara' la seconda meta' dell'array
	std::string slice1[n/2], slice2[n-n/2];
	//copio la meta' dei valori dell'array nel array slice1
	copyArray(arr, slice1, n, 0, n/2);
	//richiamo ricorsivamente la funzione mergeSort con la prima meta' dell'array
	mergeSort(slice1, n/2);
	//copio la seconda meta' dei valori dell'array nel array slice2
	copyArray(arr, slice2, n, n/2, n);
	//richiamo ricorsivamente la funzione mergeSort con la seconda meta' dell'array
	mergeSort(slice2, n-n/2);

	//unisco le due slice (ordinate) dell'array e inserisco il valore nell'array arr
	merge(slice1, slice2, n/2, n-n/2, arr);
}


void copyArray(std::string arr1[], std::string arr2[], int n, int start1, int end1, int start2, int end2){
   //se i default parameter non sono stati specificati gli setto il massimo valore dell'array
	if (end1 == 0)
		end1 = n;
	if (end2 == 0)
		end2 = n;

	//fino a che un indice start non e' maggiore o uguale di un indice end copio gli elementi di arr1 in arr2
	while (start1 < end1 && start2 < end2)
		arr2[start2++] = arr1[start1++];
}

void merge(std::string arr1[], std::string arr2[], int n1, int n2, std::string arr[]){
	//creo 3 indici che corrispondono agli index dei vari array aventi come parametro
	int index1 = 0, index2 = 0, index3 = 0;
	//ciclo fino a che uno degli array non e' vuoto
	while (index1 != n1 && index2 != n2){
		//se il primo numero 'e maggiore dell'altro allora scrivo nell'array l'altro numero
		if (arr1[index1].length() > arr2[index2].length()){
			arr[index3] = arr2[index2];
			index2++;
		//altrimenti scrivo nell'array il primo numero
		}else{
			arr[index3] = arr1[index1];
			index1++;
		}
		//aggiorno la posizione dell'array
		index3++;
	}

	//arrivati a questo punto uno dei due array da unire e' vuoto, quindi scopro quale e' ed inserisco tutti i valori in fila dell'array che non e' vuoto
	if (index1 == n1){
		while (index2 != n2){
			arr[index3] = arr2[index2];
			index2++; index3++;
		}
	}else{
		while (index1 != n1){
			arr[index3] = arr1[index1];
			index1++; index3++;
		}
	}

}
